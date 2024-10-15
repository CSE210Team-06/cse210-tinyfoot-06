// Code for Security
// Written by Sahil
function sanitizeHTML(html) {
    return $('<div>').text(html).html();
}

// Code for Error Handling
// Written by Sahil
function handleError(message) {
    console.error("Footnote Error:", message);
}

// Code for event Handlers

// Should be called before inserting
// Written by Sahil
function openFootnote(footnoteId) {
    try {
        if (!footnoteId) {
            throw new Error("Footnote ID is missing");
        }

        // Check if the footnote already exists in sessionStorage
        const existingContent = sessionStorage.getItem(footnoteId);
        if (!existingContent) {
            // Store footnote content in sessionStorage
            const footnoteContent = $(footnoteId).html();
            const num = footnoteId.replace('#fn', '');
            if (!footnoteContent) {
                throw new Error("Footnote content not found");
            }
            const sanitizedContent = sanitizeHTML(footnoteContent);
            sessionStorage.setItem(footnoteId, num + ". " +  sanitizedContent);
        }

        // Now check if our footnote is already in the side menu
        if (!$('#side-menu-content').find('[data-footnote-id="' + footnoteId + '"]').length) {
            loadFootnote(footnoteId);
        }

        // Open the side menu
        $('#side-menu').css('display', 'block').addClass('open');

    } catch (error) {
        handleError(error.message);
    }
}

function closeSideMenu(event) {
    event.preventDefault(); // Prevent default behavior of hyperlink
    $('#side-menu').removeClass('open').css('display', 'none'); // Close and hide menu
}

// Retrieve the footnote from sessionStorage and append it to the side menu
function loadFootnote(footnoteId) {
     // Retrieve the footnote content from sessionStorage
     const footnoteContent = sessionStorage.getItem(footnoteId);
    
     if (footnoteContent) {
         // Sanitize the content before appending to the side menu
         const sanitizedContent = sanitizeHTML(footnoteContent);
         
         // Append the footnote to the side menu
         $('#side-menu-content').append('<div class="footnote-item" data-footnote-id="' + footnoteId + '">' + sanitizedContent + '</div>');
     } else {
         console.log("Footnote not found in sessionStorage:", footnoteId);
     }
}

// Format for creating footnote
/**
 * <a> id="fn{number}" your text here</a> 
 */


// Code for initializing
    function initSideMenu() {
        $('body').append(' <!-- Side menu --> <div id="side-menu" class="menu"> <a href="#" id="close-menu">Close Menu</a> <div id="side-menu-content"></div></div> ');
    }

    function processFnIds() {
        let allFootnotes = $('a[id^="fn"]');
        if (allFootnotes.length >= 0) { // >= IS A PLACEHOLDER, PLEASE DELETE LATER!!!
            initSideMenu();
            $('#close-menu').click(closeSideMenu);
        }
        
        for (let i = 0; i < allFootnotes.length; i++) {
            const id = '#' + $(allFootnotes[i]).attr('id');
            openFootnote(id)
            createFootnote(id)
    }
}

    function createFootnote(id) {
        const num = id.replace('#fn', '');  
        const newFootNote = `<sup id="fn${num}"> <a href="fn${num}" class="footnote-link">${num}</a> </sup>`;
        $(id).html(newFootNote);
    }
    
        

// The eqivalent to calling main
$(document).ready(function() {

    // call the function to process footnotes
    processFnIds();
    
    // Open side menu on clicking a footnote link
    // Written by Sahil
    $('.footnote-link').click(function(event) {
        event.preventDefault(); // Prevent default behavior of hyperlink
        const footnoteId = '#' + $(this).attr('href'); // Get the footnote ID
        console.log("click event id:", footnoteId);
        openFootnote(footnoteId);
    });

    $('#close-menu').click(function(event) {
        try {
            event.preventDefault(); // Prevent default behavior of hyperlink
            $('#side-menu').removeClass('open').css('display', 'none');
            // Hides the side menu and removes 'open' class
            $('#side-menu-content').empty();
            // Clears the content when closing
        } catch (error) {
            handleError(error.message);
            // This block is used to handle all the errors that occur during the above process
        }
    });

    // Close side menu on click anywhere outside
    // Written by Sahil
    $(document).click(function(event) {
        try {
            if (!$(event.target).closest('#side-menu, .footnote-link').length) {
                // Checks if click is outside the side menu and footnote links
                $('#side-menu').removeClass('open').css('display', 'none');
                $('#side-menu-content').empty();
                // Closes the side menu and clears its content
            }
        } catch (error) {
            handleError(error.message);
            // This block is used to handle all the errors that occur during the above process
        }
    });


    // Keyboard Input!
    // Written by Sahil
    $(document).keyup(function(e) {
        try {
            if (e.key === "Escape") {
                $('#side-menu').removeClass('open').css('display', 'none');
                $('#side-menu-content').empty();
            } else if (/^\d+$/.test(e.key)) {
                // Check if the pressed key is a number
                let footnoteNumber = parseInt(e.key, 10);
                
                // If Ctrl key is pressed along with a number, add 10 to the footnote number
                if (e.ctrlKey) {
                    footnoteNumber += 10;
                }
                
                // First, close the side menu if it is open
                $('#side-menu').removeClass('open').css('display', 'none');
                $('#side-menu-content').empty();

                // Open footnote corresponding to the number
                openFootnote('#fn' + footnoteNumber);
            }
        } catch (error) {
            handleError(error.message);
        }
    });
});