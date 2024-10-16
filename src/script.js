// Format for creating footnote
/**
 * <a> id="fn{number}" your text here</a>
 */
// Known Limitation: The current implementation inadvertently triggers the side menu to open upon page reload. This behavior is unintended and has been identified as a priority for optimization in the next development iteration.
// Code for Security

// Santizes HTML content to prevent XSS attacks
// @author Sahil, Vincent
// @returns {string} sanitized HTML content
function sanitizeHTML(html) {
  return $("<div>").text(html).html();
}

// Code for Error Handling

// Logs error messages to the console
// @param {string} message - error message
// @author Sahil, Vincent
// @returns {void}
function handleError(message) {
  console.error("Footnote Error:", message);
}

function injectCSSFile(href) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = href;
  document.head.appendChild(link);
}

// Code for event Handlers

// Handles opening footnotes by performing insertion of contents into side menu
// @param {string} footnoteId - ID of the footnote to be opened
// @author Sahil, Vincent
// @returns {void}
function openFootnote(footnoteId) {
  try {
    if (!footnoteId) {
      throw new Error("Footnote ID is missing");
    }

    // Check if the footnote already exists in sessionStorage
    const existingContent = sessionStorage.getItem(footnoteId);
    if (!existingContent) {
      const footnoteContent = $(footnoteId).html(); // extract footnote text
      const num = footnoteId.replace("#fn", ""); // extract the footnote number from its ID
      if (!footnoteContent) {
        throw new Error("Footnote content not found");
      }
      const sanitizedContent = sanitizeHTML(footnoteContent);
      sessionStorage.setItem(footnoteId, num + ". " + sanitizedContent); // store the footnote content in sessionStorage
    }

    // If footnote is not already in the side menu, load it from sessionStorage
    if (
      !$("#side-menu-content").find('[data-footnote-id="' + footnoteId + '"]')
        .length
    ) {
      loadFootnote(footnoteId);
    }

    // Display the side menu
    $("#side-menu").css("display", "block").addClass("open");
  } catch (error) {
    handleError(error.message);
  }
}

// Implements "close menu" button functionality
// @param {Event} event - click event object
// @author Sahil, Vincent
// @returns {void}
function closeSideMenu(event) {
  event.preventDefault(); // Prevent default behavior of hyperlink
  $("#side-menu").removeClass("open").css("display", "none"); // Close and hide menu
}

// Retrieves the footnote from sessionStorage and inserts it into the side menu
// @param {string} footnoteId - ID of the footnote to be loaded
// @author Sahil, Vincent
// @returns {void}
function loadFootnote(footnoteId) {
  // Retrieve the footnote content from sessionStorage
  const footnoteContent = sessionStorage.getItem(footnoteId);

  if (footnoteContent) {
    // Sanitize the content before appending to the side menu
    const sanitizedContent = sanitizeHTML(footnoteContent);

    // Append the footnote to the side menu
    $("#side-menu-content").append(
      '<div class="footnote-item" data-footnote-id="' +
        footnoteId +
        '">' +
        sanitizedContent +
        "</div>"
    );
  } else {
    console.log("Footnote not found in sessionStorage:", footnoteId);
  }
}

// Code for initializing

// Initializes the side menu by adding the required HTML elements to the DOM
// @author Sahil, Vincent
// @returns {void}
function initSideMenu() {
  $("body").append(
    ' <!-- Side menu --> <div id="side-menu" class="menu">' +
      '<a href="#" id="close-menu">Close Menu</a> <div id="side-menu-content"></div></div>'
  );
}

// Processes all footnote <a> tags in the document by creating proper footnotes and inserting their content into the side menu
// @author Sahil, Vincent
// @returns {void}
function processFnIds() {
  let allFootnotes = $('a[id^="fn"]'); // regex to get all footnote <a> tags, identified by their ID starting with "fn"
  if (allFootnotes.length > 0) {
    initSideMenu();
    $("#close-menu").click(closeSideMenu);
  }

  // Iterate over all the footnotes and process them
  for (let i = 0; i < allFootnotes.length; i++) {
    const id = "#" + $(allFootnotes[i]).attr("id"); // add '#' so the id works with jQuery selectors
    openFootnote(id);
    createFootnoteLink(id);

    /*const footnoteContent = $(id).html();
        const num = id.replace('#fn', '');
        if (footnoteContent) {
            const sanitizedContent = sanitizeHTML(footnoteContent);
            sessionStorage.setItem(id, num + ". " + sanitizedContent);
        }*/
  }
}

// Converts footnote<a> tags into proper footnotes. Refer to the format for creating footnotes
// @author Sahil, Vincent
// @returns {void}
function createFootnoteLink(id) {
  const num = id.replace("#fn", ""); // extract the footnote number from its ID
  const newFootNote = `<sup id="fn${num}"> <a href="fn${num}" class="footnote-link">${num}</a> </sup>`;
  $(id).html(newFootNote); // replace the original footnote <a> tag with the new footnote
}

// The eqivalent to calling main
$(document).ready(function () {
  //inject a stylesheet into the document
  injectCSSFile("styles.css");
  // call the function to process footnotes
  processFnIds();

  // Open side menu on clicking a footnote link
  // @author Sahil, Vincent
  $(".footnote-link").click(function (event) {
    event.preventDefault(); // Prevent default behavior of hyperlink
    const footnoteId = "#" + $(this).attr("href"); // Get the footnote ID
    console.log("click event id:", footnoteId);
    openFootnote(footnoteId);
  });

  // Close side menu by clicking the close button
  // @author Sahil, Vincent
  $("#close-menu").click(function (event) {
    try {
      event.preventDefault(); // Prevent default behavior of hyperlink
      $("#side-menu").removeClass("open").css("display", "none");
      // Hides the side menu and removes 'open' class
      $("#side-menu-content").empty();
      // Clears the content when closing
    } catch (error) {
      handleError(error.message);
      // This block is used to handle all the errors that occur during the above process
    }
  });

  // Close side menu on click anywhere outside
  // // @author Sahil, Vincent
  $(document).click(function (event) {
    try {
      if (!$(event.target).closest("#side-menu, .footnote-link").length) {
        // Checks if click is outside the side menu and footnote links
        $("#side-menu").removeClass("open").css("display", "none");
        $("#side-menu-content").empty();
        // Closes the side menu and clears its content
      }
    } catch (error) {
      handleError(error.message);
      // This block is used to handle all the errors that occur during the above process
    }
  });

  // Keyboard Input to open or close specific footnotes
  // // @author Sahil, Vincent
  $(document).keyup(function (e) {
    try {
      if (e.key === "Escape") {
        $("#side-menu").removeClass("open").css("display", "none");
        $("#side-menu-content").empty();
      } else if (/^\d+$/.test(e.key)) {
        // Check if the pressed key is a number
        let footnoteNumber = parseInt(e.key, 10);

        // If Ctrl key is pressed along with a number, add 10 to the footnote number
        if (e.ctrlKey) {
          footnoteNumber += 10;
        }

        // First, close the side menu if it is open
        $("#side-menu").removeClass("open").css("display", "none");
        $("#side-menu-content").empty();

        // Open footnote corresponding to the number
        openFootnote("#fn" + footnoteNumber);
      }
    } catch (error) {
      handleError(error.message);
    }
  });
});
