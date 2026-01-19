const BASE_URL_TUMBLR = 'https://www.tumblr.com'
async function getStringHtml(url) {
    try{
        const resp = await fetch(url, {
                method: 'GET',
                headers: { 
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
                    'Content-Type': 'text/html'
                 },
                
            });
        const respHtml = await resp.text()
        return respHtml.toString()
    } catch(error) {
        return  ""
    }
}

// Article."FtjPK r0etU" > Header.DEkbl, div."eA_DC y3qwY" > {div > ... > span, div}
// a aria-label="Permalink" has all links to posts 
// Header is author's relation to post, 
// span > div has all post content
//    span > div.SDhRH > (div.u2txn, ... , div.u2txn) going into each div.u2txn is post/reblog div._7Vla9 inside is user 
//    div.u2txn > (div._7Vla9, div > div.GzjsW > (div.k31gt, ..., div.k31gt)) each div.k31gt has all the text in paragraphs, smalls or whatever element.
// Article."FtjPK r0etU" > div."eA_DC y3qwY" > div.qYXF9 > div.hAFp3 > div.mwjNz has all the tag #s 
function processTrumblrPage(html) {
    const cheerio = require('cheerio');
    const $ = cheerio.load(html);
    const allPosts = []
    const allPostsOnPage = $('article.FtjPK'); // article.FtjPK r0etU
    // Check p.F2bKK to check if a post is pinned. If it is ignore it.
    const pinned = allPostsOnPage.find(".F2bKK").length
    allPostsOnPage.each((_i, el) => {
        if (_i > pinned) { 
            const post = $(el).find(".Qb2zX") // all users + posts
            // const tags = $(el).find("div.mwjNz") // tags
            post.each((__i, el) => {
                var author = "";
                var id;
                const users = []
                const postBody = []
                const postDates = []
                const postLinks = []
                const dates = $(el).find('.l4Qpd')
                const usersInPost = $(el).find(".BSUG4")  
                const posts = $(el).find(".GzjsW")
                const links = $(el).find(".gg65T")    
                const titleInfo = [] // [title, subtitle]
                usersInPost.each((___i, userEl) => { // username
                    const userString = $(userEl).text();
                    if (___i === 0) { 
                        author = userString 
                    } else if (userString !== "" && !userString.includes('@')) {
                        users.push(userString)
                    } 
                })
                posts.each((___i, postEl) => { // post content
                    if (___i === 0) { // includes title and subtitles 
                        $(postEl).find(".k31gt").each((___i, titleEl) => {
                            titleInfo.push($(titleEl).text())          // Gets title then sub-title
                        })
                    } else {
                        postBody.push($(postEl).text())
                    }
                })
                dates.each((___i, datesEl) => { // posted Dates
                    postDates.push($(datesEl).attr('aria-label'))
                })
                links.each((___i, linksEl) => { // links for each post
                    postLinks.push(BASE_URL_TUMBLR + $(linksEl).attr('href'))
                })
                if (author === "" && users.length > 0) author = users.shift()
                if (postLinks && postLinks.length > 0) id = postLinks[0].replace(/\D/g, "")
                allPosts.push({id:id, title:titleInfo[0], subtitle: titleInfo[1], author:author, 
                                dates:postDates, links:postLinks, users:users, body:postBody})
            })
        }
    })
    return allPosts
}

function processSingleBrunoPage(html) {
    const cheerio = require('cheerio');
    const $ = cheerio.load(html);
    const dates = []
    const allPosts = []
    const postinfo = $('div#all-posts').find("div.postinfo");
    const postsDivs = $('div#all-posts').find("div.post");

    //Gets Next Link to Search
    const links = $.extract({
            links: {
                selector: 'a#next',
                value: 'href',
            }
    })

    // const tags = $('div#all-posts').find("div.tags");

     // Getes all the dates for each post
    postinfo.each((_i, el) => {
        const contentOfA = $(el).find("a").first().text()
        if (contentOfA === "pinned") {
            dates.push(contentOfA + " " + $(el).find("a").next().first().text())
        } else {
            dates.push(contentOfA)
        }
    })

    // Goes through all-posts to get each indiviual post id, reblog body & reblog-header
    postsDivs.each((_i, el) => {
        const body = []
        const header = []
        $(el).find(".reblog-body").each((_i, el) => {
            body.push($(el).text())
        })
        $(el).find(".reblog-header").each((_i, el) => {
            header.push($(el).text().trim().replace(/^\n|\n$/g, ""))
        })
        const linkToPost = $(el).find(".reblog-header").extract({
            links: {
                selector: 'a',
                value: 'href',
            }})
        const title = body.shift()
        const author = header.shift()
        const postId = $(el).attr()["id"]
        allPosts.push({id:postId, links:linkToPost["links"], dates:dates[_i], title:title, author:author, users:header, bodys:body})
    })
    return [allPosts, links["links"]]
}

// Works for tumblr page format
function consolidateOrRemove(arrOfObj) {
    const resArr = []
    for (const obj of arrOfObj) {
        var notInArr = true
        // Check Array
        for (const resObj of resArr) {
            if (resObj["title"] === obj["title"]) {
                // Check if a duplicate of this is not already in the loop add
                if(!resObj["dates"].includes(obj["dates"][1])) {
                    resObj["links"] = [...resObj["links"], ...obj["links"].slice(1)]
                    resObj["dates"] = [...resObj["dates"], ...obj["dates"].slice(1)]
                    resObj["body"] = [...resObj["body"], ...obj["body"]]
                    resObj["users"] = [...resObj["users"], ...obj["users"]]
                }
                notInArr = false;
            }
        }
        if (notInArr) {
            resArr.push(obj)
        }
    }
    return resArr
}


async function webScrap(url, ...argsToFind) {
    const respHtml = await getStringHtml(url)
    var posts = []
    const searchTheseUrls = [];
    if (url === 'https://stormofembla.tumblr.com/') {
        const [pageInfo, nextLink] = processSingleBrunoPage(respHtml)
        posts = [...posts, ...pageInfo]

        searchTheseUrls.push(url + nextLink)
        while(searchTheseUrls.length !== 0) {
            const nxetPageHtml = await getStringHtml(searchTheseUrls.shift())
            const [pageInfo, nextLink] = processSingleBrunoPage(nxetPageHtml)
            posts = [...posts, ...pageInfo]
            if (nextLink && nextLink !== "") {
                searchTheseUrls.push(url + nextLink)
            }
            console.log(nextLink)
        }
    } else {
        posts = processTrumblrPage(respHtml)
    }
    posts = consolidateOrRemove(posts)
    return posts
} export default webScrap 