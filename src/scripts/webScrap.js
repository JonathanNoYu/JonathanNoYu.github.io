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