var heightLimit = 140;

var gridObject = $('.column-grid-container').masonry({
    itemSelector: '.grid-item'

});

function splitText(text, currentHeight,maxHeight)
{
    var pCut = maxHeight /  currentHeight;
    var text1 ="";
    var text2 ="";
    var breakIndex = -1;
    var newLength = text.length * pCut;
    var wordArray = text.split(" ");
    var textAccum = "";
    for (var k= 0;k<wordArray.length;k++)
    {
        var testString = textAccum+" "+wordArray[k];
        if (testString.length >= newLength)
        {
            breakIndex = k;
            break;
        }
        else
        {
            textAccum += wordArray[k]+" ";
        }
    }
    for (k=0;k<breakIndex;k++)
    {
        text1 += wordArray[k]+' ';
    }
    for (k=breakIndex;k<wordArray.length;k++)
    {
        text2 += wordArray[k]+' ';
    }

    var text1 = text1.trim() + ' <span class="extra-text hidden">' + text2.trim() + "</span>"
    
    return text1;
}


$('.grid-item .post-item-post-content').each(function (i, elem)
{
    var currentSize = window.getSize(elem)
    //console.log("0 idx " + i + " text height " + m.height)
    var showButton = $(elem).find(".full-text-trigger");
    var postText = $(elem).find(".post-text");
    var text = postText.text();
    
    text = text.replace(/\s\s+/g,' ');
    text = text.trim();
    var len = text.length;
    if (postText.hasClass("trimmed"))
    {
        return;
    }

    
   
    if (currentSize.height > heightLimit)
    {


        var trimmedText = splitText(text,currentSize.height,heightLimit);
        postText.html(trimmedText);
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
    postText.html("(" + len + ") " + postText.html());
    gridObject.masonry();

});
