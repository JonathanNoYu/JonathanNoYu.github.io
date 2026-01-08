async function webScrap(url, ...argsToFind) {
    try {
        const cheerio = require('cheerio');
        const resp = await fetch(url, {
            headers: { 'User-Agent': 
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36' },
        });
        const respHtml = await resp.text()
        var $ = cheerio.load(respHtml);
        const post = []
        const dates = []

        // Gets the next page
        // const links = $.extract({
        //     links: {
        //         selector: 'a#next',
        //         value: 'href',
        //     }
        // })

        // const tags = $('div#all-posts').find("div.tags");
        const postinfo = $('div#all-posts').find("div.postinfo");
        const postsDivs = $('div#all-posts').find("div.post");

        // Getes all the dates for each post
        postinfo.each((_i, el) => {
            const contentOfA = $(el).find("a").first().text()
            if (contentOfA === "pinned") {
                dates.push($(el).find("a").next().first().text())
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
            post.push({id:postId, link:linkToPost["links"], date:dates[_i], title:title, author:author, users:header, bodys:body})
        })
        return post
  } catch (error) {
    console.error(error);
  }
} export default webScrap