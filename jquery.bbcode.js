// BBCode.js v0.1 by Kai Mallea
// https://github.com/kaimallea/bbcode
// License: http://www.opensource.org/licenses/mit-license.php
(function(){var d={},i;d.VERSION="0.1";i=function(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")};_render=function(e,d){var a={},f={escape:!0,newlines:!0};if(!e)return"";if(d)for(var g in d)d.hasOwnProperty(g)&&(f[g]=d[g]);f.escape&&(e=i(e));a.bold={re:/\[b\]([\s\S]*?)\[\/b\]/ig,sub:function(a,b){return"<strong>"+b+"</strong>"}};a.italic={re:/\[i\]([\s\S]*?)\[\/i\]/ig,sub:function(a,b){return"<em>"+b+"</em>"}};a.code={re:/\[code\]([\s\S]*?)\[\/code\]/ig,
sub:function(a,b){return"<pre><code>"+b+"</code></pre>"}};a.quote={re:/\[quote\]([\s\S]*?)\[\/quote\]/ig,sub:function(a,b){return"<blockquote><p>"+b+"<p></blockquote>"}};a.quotespecific={re:/\[quote=(?:"|&quot;)(.*?)(?:"|&quot;)\]([\s\S]*?)\[\/quote\]/ig,sub:function(a,b,c){return b+" wrote: <blockquote><p>"+c+"<p></blockquote>"}};a.size={re:/\[size=(\d+)\]([\s\S]*?)\[\/size\]/ig,sub:function(a,b,c){return'<span style="font-size:'+b+'%;">'+c+"</span>"}};a.strikethrough={re:/\[s\]([\s\S]*?)\[\/s\]/ig,
sub:function(a,b){return"<del>"+b+"</del>"}};a.underline={re:/\[u\]([\s\S]*?)\[\/u\]/ig,sub:function(a,b){return'<span style="text-decoration:underline;">'+b+"</span>"}};a.center={re:/\[center\]([\s\S]*?)\[\/center\]/ig,sub:function(a,b){return'<div style="text-align:center;">'+b+"</div>"}};a.color={re:/\[color=([#a-z0-9]+)\]([\s\S]*?)\[\/color\]/ig,sub:function(a,b,c){return'<span style="color:'+b+';">'+c+"</span>"}};a.email={re:/\[email\]([\s\S]*?)\[\/email\]/ig,sub:function(a,b){return'<a href="mailto:'+
b+'">'+b+"</a>"}};a.emailcustom={re:/\[email=(.*?)\]([\s\S]*?)\[\/email\]/ig,sub:function(a,b,c){return'<a href="mailto:'+b+'">'+c+"</a>"}};a.url={re:/\[url\]([\s\S]*?)\[\/url\]/ig,sub:function(a,b){return'<a href="'+b+'">'+b+"</a>"}};a.urlcustom={re:/\[url=(.*?)\]([\s\S]*?)\[\/url\]/ig,sub:function(a,b,c){return'<a href="'+b+'">'+c+"</a>"}};a.img={re:/\[img\]([\s\S]*?)\[\/img\]/ig,sub:function(a,b){return'<img src="'+b+'"/>'}};a.lists={re:/\[list\]([\s\S]*?)\[\/list\]/ig,sub:function(a,b){b=b.replace(/\[\*\]([^\[\*\]]*)/ig,
function(b,a){return"<li>"+a.replace(/[\n\r?]/,"")+"</li>"});return"<ul>"+b.replace(/[\n\r?]/,"")+"</ul>"}};a.lists2={re:/\[list=(1|a)\]([\s\S]*?)\[\/list\]/ig,sub:function(a,b,c){a="";a=b==="1"?"<ol>":b==="a"?'<ol style="list-style-type: lower-alpha">':"<ol>";c=c.replace(/\[\*\]([^\[\*\]]*)/ig,function(a,b){return"<li>"+b.replace(/[\n\r?]/,"")+"</li>"});return a+c.replace(/[\n\r?]/,"")+"</ol>"}};a.youtube={re:/\[youtube\](?:http?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/watch\?v=)([A-Z0-9\-_]+)(?:&(.*?))?\[\/youtube\]/ig,
sub:function(a,b){return'<iframe class="youtube-player" type="text/html" width="640" height="385" src="http://www.youtube.com/embed/'+b+'" frameborder="0"></iframe>'}};if(f.newlines)a.newlines={re:/\n\r?/g,sub:function(){return"<br/>"}};for(var h in a)a.hasOwnProperty(h)&&(e=e.replace(a[h].re,a[h].sub));return e};d.render=_render;typeof module!=="undefined"&&module.exports?module.exports=d:this.bbcode=d})();

// jquery.bbcode by Kai Mallea
// https://github.com/kaimallea/jquery-bbcode
// License: http://www.opensource.org/licenses/mit-license.php
(function ($) {
    $.fn.bbcode = function () {
        var editor = '<div class="bbcode-editor"><span>Reply to this post (<a href="http://area51.phpbb.com/phpBB/faq.php?mode=bbcode" target="_new">BBCode allowed</a>)</span><textarea></textarea><div class="bbcode-preview"></div></div>';
        
        return this.each(function () {
            var $this = $(this);
            if ($this.is('textarea')) {
                var $editor = $(editor),
                    $cloned_textarea = $this.clone().addClass('bbcode-textarea');
                
                $editor.find('textarea').replaceWith($cloned_textarea);
                
                $cloned_textarea.bind('keyup', function () {
                    $cloned_textarea.next('.bbcode-preview').html(bbcode.render($cloned_textarea.val()));
                });
                
                $this.replaceWith($editor);
            }
        });
    };
}(jQuery));