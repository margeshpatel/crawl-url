var cheerio = require('cheerio');
var request = require('request');
var async = require('async');
var http = require('http')
  , https = require('https')
  , fs = require('fs')
  , readline = require('readline')
  , url = require('url')
  , path = require('path')
  , options;
var program = require('commander');

program
  .version('0.0.1')
  .option('-u, --url [type]', 'Url to crawl images from [http://codechants.com]')
  .option('-f, --file [type]', 'File to crawl images from')
  .parse(process.argv);


var cli_url = program.url;
var cli_file = program.file;
var images = [];
var flag = 0;
var pages = [];

module.exports = {
  build_array: function(callback){

    if((cli_url) && (!cli_file)){
      // console.log(cli_url);
      pages.push(cli_url);
      callback(pages);
    }else if((cli_file) && (!cli_url)){
      var urls = [];
      var rd = readline.createInterface({
        input: fs.createReadStream(cli_file),
        output: process.stdout,
        terminal: false
      });

      rd.on('line', function(line) {
        if(line){
          // console.log(line);
          pages.push(line);
        }
      });
      rd.on('close', function(pages) {
        callback(pages);
      });
    }else{
      // console.log(cli_url);
      pages.push(cli_url);
      var urls = [];
      var rd = readline.createInterface({
        input: fs.createReadStream(cli_file),
        output: process.stdout,
        terminal: false
      });

      rd.on('line', function(line) {
        if(line){
          // console.log(line);
          pages.push(line);
        }
      });
      rd.on('close', function(pages) {
        callback(pages);
      });
    }
  },

  crawl_images: function(options, callback) {

    console.log("Total urls found : "+pages.length);
    for (var i = 0; i < pages.length; i++) {
      perPage(pages[i],function(err){
        console.log("Saving images from url : "+err);
      });
    }
    process.on('uncaughtException', function (err) {
        console.log(err);
    });
  }
}

function perPage(crawl_page, callback) {
  request(crawl_page, function(error, response, body) {
    if(error) {
      callback(error);
    } else if (response.statusCode == 200) {
      $ = cheerio.load(body);
      var image = {};
      var folder = url.parse(crawl_page).host;
      if(!fs.existsSync(folder)){
        fs.mkdirSync(folder);
      }
      $('img').each( function(index, element) {
        var text = $(this).text();
        var img_path = $(this).attr('src');
        var extra_path = url.parse(String($(this).attr('src')),true);

        if(String(img_path).indexOf("//") == 0){
          img_path = url.parse(crawl_page).protocol + img_path;
        }
        if( (typeof(img_path) != 'undefined') && (img_path.indexOf('http') == 0) ){
          // var media_path = img_path;
          var media_path = url.format({
            protocol : url.parse(extra_path).protocol,
            hostname : url.parse(extra_path).hostname,
            pathname : extra_path.pathname,
            search : null
          });
        }else{
          var media_path = url.format({
            protocol : url.parse(crawl_page).protocol,
            hostname : url.parse(crawl_page).hostname,
            pathname : extra_path.pathname,
            search : null
          });
        };
        if(media_path.indexOf('https:') == 0){
          https.get(media_path,function(res){
            var imagedata = ''
            res.setEncoding('binary')

            res.on('data', function(chunk){
                imagedata += chunk
                if(typeof flag == 'undefined') flag = 0;
            })

            res.on('end', function(){
                fs.writeFile(folder+'/'+path.basename(extra_path.pathname), imagedata, 'binary', function(err){
                    if (err) return;
                    flag = flag+1;
                })
            })

          })
        }else{
          http.get(media_path,function(res){
              var imagedata = ''
              res.setEncoding('binary')

              res.on('data', function(chunk){
                  imagedata += chunk
                  if(typeof flag == 'undefined') flag = 0;
              })

              res.on('end', function(){
                  fs.writeFile(folder+'/'+path.basename(extra_path.pathname), imagedata, 'binary', function(err){
                      if (err) return;
                      flag = flag+1;
                  })
              })

          })
        }

      });
      callback(crawl_page);
    } else {
      console.log(response.statusCode)
      callback(new Error('Could not request unsplash'));
    }
  });
};