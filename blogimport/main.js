var TurndownService = require('turndown')

var turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced"
}).addRule("customQuote", {
    filter: function(node, options) {
        return (node.nodeName === 'DIV' && (node.getAttribute('class') == "quote"));
    },
    replacement: function(content, node, options) {
        return content.trim().split("\n").map( l=> "> " + l).join("\n")
    }
}).addRule("customCodeBlock", {
    filter: function(node, options) {
        if (node.nodeName === 'DIV' && (node.getAttribute('class') == "code")) return true;
        if (node.nodeName === 'CODE' && node.childElementCount == 1 && node.childNodes[0].nodeName == "PRE") return true;
        if (node.nodeName === 'PRE' && node.childElementCount == 1 && node.childNodes[0].nodeName == "CODE") return true;

        return false;
    },
    replacement: function(content, node, options) {
        if ( options.codeBlockStyle == "indented" ) {
            return content.trim().split("\n").map( l=> "    " + l).join("\n")
        } else {
            return '```\n' + content.trim() + '\n```\n';
        }
        
    }
}).addRule("customCodeSpan", {
    filter: function(node, options) {
        return (node.nodeName === 'SPAN' && (node.getAttribute('class') == "code"));
    },
    replacement: function(content, node, options) {
        return '`' + content.trim() + '`';
    }
}).use(require('turndown-plugin-gfm').gfm)

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

var fs = require('fs');
var parser = require('xml2json');
var { DateTime, IANAZone } = require('luxon');

fs.readFile('./Movable_Type-2020-04-05-00-13-52-Backup-1.xml', function (err, data) {
    var json = parser.toJson(data, { object: true });

    json.movabletype.entry.forEach(entry => {
        var dateComponents = entry.authored_on.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/)
        var date = DateTime.fromObject({
            year: dateComponents[1],
            month: dateComponents[2],
            day: dateComponents[3],
            hour: dateComponents[4],
            minute: dateComponents[5],
            second: dateComponents[6],
            zone: IANAZone.create("America/New_York")
        });

        var frontMatterDate = date.toFormat("yyyy-LL-dd HH:mm:ss ZZZ")
        var filenameDate = date.toFormat("yyyy-LL-dd")

        var title = turndownService.turndown(entities.decode(entry.title));
        var titleSlug = title.toLowerCase().replace('c#', 'csharp').replace(/[^a-z0-9 ]/g, '').replace(/[ ]+/g, '-')

        var filename = filenameDate + '-' + titleSlug + '.markdown';
        var exportPath = '../_posts/' + filename

        var originalPath = '/archives' + date.toFormat('/yyyy/LL/') + entry.basename + ".shtml"
        var originalUrl = 'http://seankerwin.org' + originalPath
        
        // if ( entry.id == "180") {
        //     debugger;
        // }

        var markdown = ''
        if (entry.convert_breaks.startsWith('markdown')) {
            markdown = entry.text
        } else if (entry.convert_breaks == 'richtext' || entry.convert_breaks == "0") {
            markdown = turndownService.turndown(entry.text)
        } else if (entry.convert_breaks == '__default__') {
            var x = entry.text.replace(/^[ ]+$/mg, "").replace(/\n\n\n+/g, "\n").replace(/$/gm, "<br />");
            markdown = turndownService.turndown(x);
        } else {
            markdown = entry.text
        }

        markdown = markdown.replace(/^[ ]+$/mg, "").replace(/\n\n\n+/g, "\n\n")
        markdown = markdown.replace(/\(http:\/\/seankerwin.org\/images([^\)]*)\)/g, "(/assets$1)");
        markdown = markdown.replace(/\(http:\/\/seankerwin.org([^\)]*)\)/g, "($1)")
        markdown = markdown.replace(/\(http:\/\/dl.getdropbox.com\/u\/515062([^\)]*)\)/g, "(/assets$1)");
        markdown = markdown.replace(/\(http:\/\/dl.dropbox.com\/u\/515062([^\)]*)\)/g, "(/assets$1)");
        markdown = markdown.replace("http://dilbert.com/dyn/str_strip/000000000/00000000/0000000/000000/00000/0000/000/18/18.strip.gif", "https://assets.amuniversal.com/2dad43006d5901301d7d001dd8b71c47");
        markdown = markdown.replace("../images/rover.gif", "/assets/rover.gif");
        markdown = markdown.trim();

        var fileContent = `---
title: "${title}"
date: ${frontMatterDate}
redirect_from:
  - ${originalPath}
legacy_url: ${originalUrl}
---
${markdown}
`
        fs.writeFileSync(exportPath, fileContent)
    });
});
