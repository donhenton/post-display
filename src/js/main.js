var lengthCount = 140;

var gridObject = $('.column-grid-container').masonry({
    itemSelector: '.grid-item'

});


$('.grid-item .post-item-post-content').each(function (i, elem)
{
    var m = window.getSize(elem)
    console.log("0 idx " + i + " text height " + m.height)
    var showButton = $(elem).find(".full-text-trigger");
    var postText = $(elem).find(".post-text");
    if (postText.hasClass("trimmed"))
    {
        return;
    }

    var text = postText.text();
    text = text.trim();
    var len = text.length;
    // 
    if (m.height > lengthCount)
    {


        var pCut = lengthCount / m.height;
        var newLength = text.length * pCut;
        // console.log("1 idx " + i + " text height " + m.height + " cut " + pCut)

        var text1 = text.substring(0, newLength);
        var text2 = text.substring(newLength + 1, text.length)
        
        postText.html(text1 + '<span class="extra-text hidden">' + text2 + "</span>");
        postText.toggleClass("trimmed")
        // showButton.toggleClass("hidden");
        showButton.on("click", function ()
        {
            var buttonText = $(this).text();
            if (buttonText.toUpperCase() === 'MORE')
            {
                $(this).text("Less")
            } else
            {
                $(this).text("More")
            }

            var extraText = postText.find('.extra-text');
            extraText.toggleClass('hidden');
            gridObject.masonry();
            //console.log($(this).text()+"\n"+" "+t);
        })

    } else
    {
        showButton.toggleClass("hidden");
    }
     postText.html("("+len+") "+postText.html());
    gridObject.masonry();

});
