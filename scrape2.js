const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

//Write Headers
writeStream.write(`Title;Link \n`);

request('https://blackrockdigital.github.io/startbootstrap-clean-blog/', (error, response, html) => {
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);

        $('.post-preview').each((i, el) => {
            const title = $(el)
                .find('.post-title')
                .text()
                .replace(/\s\s+/g, '');
                //.replace(/,/g, '');

                        
            console.log(title);
            
            const link = $(el)
                .find('a')
                .attr('href');
            

            /*const date = $(el)
                .find('.post-date')
                .text()
                .replace(/,/, '');*/
                
            //Write Row to CSV
            writeStream.write(`${title};${link} \n`);
        });
        console.log('Scrapping Done...');
    }
});