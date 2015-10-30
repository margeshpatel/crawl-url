## Crawl URL
------------

Often times we, coders, need to copy images of a site to replicate things or for some other reason. At that time, all we do is ctrl+s or command+s to save page and then extract those images from that saved page junk. But now, you have a new way of downloading images of an URL. And guess what, it's a command line approach!

### How to use this package:
----------------------------

After you have installed NPM, you should be ready to install this package.

This package is a command line tool so you should install this package globally to use it.

Type this command on npm installed machine to install it globally.

```javascript
    npm install -g crawl-url
```

Now if everything looks fine then you are ready to move forward. But just to make sure that the package is installed correctly, you might want to double check by typing below command to return version number.

```javascript
    crawl-url --version
```

If you want to fetch images of a **single URL** then follow this command :

```javascript
    crawl-url -u http://codechants.com
```

OR

```javascript
    crawl-url --url http://codechants.com
```

If you want to fetch images of **bunch of URLs** then please make a file with one URL in one line and PLEASE DON'T FORGET TO PUT AN EXTRA BLANK LINE AT THE END OF THE LIST. and follow this command.

```javascript
    crawl-url -f filename
```

OR

```javascript
    crawl-url --file filename
```

**Note:** Please use correct protocol(http or https) and filename must include extension in the command.

We have included a test file for this in the package named test_urls.txt

To know more about command and options, type :

```javascript
    crawl-url -h
```

In case of any issue or guidance, please feel free to reach me at : margeshpatel@gmail.com . Thank you!