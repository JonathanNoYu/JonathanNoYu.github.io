async function webScrap(url, ...argsToFind) {
    try {
        const resp = await fetch('https://stormofembla.tumblr.com/', {
            headers: { 'User-Agent': 
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36' },
        });
        const respHtml = await resp.text()
        const cheerio = require('cheerio');
        const $ = cheerio.load(respHtml);
        const elements = []
        const allposts = $('#all-posts');
        const tags = $('#all-posts').find("div.tags");
        const postinfo = $('#all-posts').find("div.postinfo");
        const posts = $('#all-posts').find("div.post");
        
        posts.each((_i, el) => {
            const htmlOfEl = $(el).toString()
            if (htmlOfEl.includes(`class="post`)) {
                elements.push($(el).text())
            }
        })
        console.log(elements[0])
  } catch (error) {
    console.error(error);
  }
}  export default webScrap