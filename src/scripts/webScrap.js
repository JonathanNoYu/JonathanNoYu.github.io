async function getStringHtml(url) {
    try{
        const resp = await fetch(url, {
                headers: { 'User-Agent': 
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36' },
            });
        const respHtml = await resp.text()
        return respHtml.toString()
    } catch(error) {
        return  ""
    }
}

function processTrumblrPage(html) {
    const cheerio = require('cheerio');
    const $ = cheerio.load(html);
    const dates = []
    const allPosts = []
    const fullPost = $('article.FtjPK'); // article.FtjPK r0etU
    // Check p.F2bKK to check if a post is pinned. If it is ignore it.
    const pinned = fullPost.find(".F2bKK").length
    fullPost.each((_i, el) => {
        if (_i > pinned) {
            // u2txn doesn't exists in the html...
            const post = $(el).find(".Qb2zX") // all users + posts
            // use text(), supposedly it should get all descendants 
            // Find all div > div.GzjsW then in each of them get text content... might have to get tags then get text put plz.
            
            
            // const tags = $(el).find("div.mwjNz") // tags
            post.each((__i, el) => {
                var author = "";
                const users = []
                const postBody = []
                const usersInPost = $(el).find(".BSUG4") // List<cheerio.element>  
                const posts =  $(el).find(".GzjsW")    // List<cheerio.element> 
                const titleInfo = []                      // [title, subtitle]
                usersInPost.each((___i, userEl) => { // username
                    const userString = $(userEl).text();
                    if (___i === 0) { 
                        author = userString 
                    } else if (userString !== "") {
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
                if (author === "" && users.length > 0) author = users.shift()
                allPosts.push({title:titleInfo[0], subtitle: titleInfo[1], author:author, users:users, body:postBody})
            })
        }
    })
    return allPosts
    // Article."FtjPK r0etU" > Header.DEkbl, div."eA_DC y3qwY" > {div > ... > span, div}
    // a aria-label="Permalink" has all links to posts 
    // Header is author's relation to post, 
    // span > div has all post content
    //    span > div.SDhRH > (div.u2txn, ... , div.u2txn) going into each div.u2txn is post/reblog div._7Vla9 inside is user 
    //    div.u2txn > (div._7Vla9, div > div.GzjsW > (div.k31gt, ..., div.k31gt)) each div.k31gt has all the text in paragraphs, smalls or whatever element.
    // Article."FtjPK r0etU" > div."eA_DC y3qwY" > div.qYXF9 > div.hAFp3 > div.mwjNz has all the tag #s 
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
        allPosts.push({id:postId, link:linkToPost["links"], date:dates[_i], title:title, author:author, users:header, bodys:body})
    })
    return [allPosts, links["links"]]
}

async function webScrap(url, ...argsToFind) {
    try {
        const cheerio = require('cheerio');
        const respHtml = await getStringHtml(url)
        const $ = cheerio.load(respHtml);
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
        }
        return posts
  } catch (error) {
    console.error(error);
  }
} export default webScrap