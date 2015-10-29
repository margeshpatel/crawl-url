## Crawl URL
------------

Often times we,coders , need to download images of a site to replicate things or for some other purpose. At that time, all we do is CTRL+s or command+s and then extract those images from that download junk. But now, you have a new way of downloading images of a URL.

### How to use this package:
----------------------------

After you have installed NPM, you should be ready to take advantage of this package.

If you want to fetch images of a **single URL** then follow this command :

```javascript
    crawl-url -u http://codechants.com
```

OR

```javascript
    crawl-url --url http://codechants.com
```

If you want to fetch images of **bunch of URLs** then please make a file with one URL in one line and PLEASE DON'T FORGET TO PUT AN EXTRA BLANK LINK AT THE END OF THE LIST. and follow this command.

```javascript
    crawl-url -f filename
```

OR

```javascript
    crawl-url --file filename
```

**Note:** Please use correct protocol(http or https).

We have included a test file for this in the package named test_urls.txt

In case of any issue or guidance, please feel free to reach me at : margeshpatel@gmail.com . Thank you!