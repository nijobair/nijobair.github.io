/*
------------------------------------------------------------
Copy Button in Code Blocks
------------------------------------------------------------
*/
let codeBlocks = document.querySelectorAll('pre');

codeBlocks.forEach(function (codeBlock) {
    let copyButton = document.createElement('button');
    copyButton.className = 'copy';
    copyButton.type = 'button';
    copyButton.ariaLabel = 'Copy code to clipboard';
    copyButton.innerText = 'Copy';

    codeBlock.append(copyButton);

    copyButton.addEventListener('click', function () {
        let code = codeBlock.querySelector('code').innerText.trim();
        window.navigator.clipboard.writeText(code);

        copyButton.innerText = 'Copied';
        let fourSeconds = 4000;

        setTimeout(function () {
            copyButton.innerText = 'Copy';
        }, fourSeconds);
    });
});


/*
------------------------------------------------------------
Image Lightbox
------------------------------------------------------------
*/
const images = document.querySelectorAll('.lightbox-image');

if (images.length > 0) { // Check if .lightbox-image elements exist
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    images.forEach(image => {
        image.addEventListener('click', e => {
            lightbox.classList.add('active');
            const img = document.createElement('img');
            img.src = image.src;
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            lightbox.appendChild(img);
        });
    });

    lightbox.addEventListener('click', e => {
        if (e.target !== e.currentTarget) return;
        lightbox.classList.remove('active');
    });
}



/*
------------------------------------------------------------
Post Filters
------------------------------------------------------------
*/
$(document).ready(function () {
    // Initialize variables for pagination
    const limitPerPage = 13; // Number of posts per page
    let currentPage = 1;

    // Helper function to create a range of numbers
    function range(start, end) {
        return Array.from(Array(end - start + 1), (_, i) => i + start);
    }

    // Function to get the list of page numbers to display in the pagination
    function getPageList(totalPages, page, maxLength) {
        const sideWidth = maxLength < 9 ? 1 : 2; // Pages on each side
        const leftWidth = (maxLength - sideWidth * 2 - 3) >> 1; // Pages left of the current page
        const rightWidth = (maxLength - sideWidth * 2 - 3) >> 1; // Pages right of the current page

        if (totalPages <= maxLength) {
            return range(1, totalPages);
        }

        if (page <= maxLength - sideWidth - 1 - rightWidth) {
            return range(1, maxLength - sideWidth - 1)
                .concat([0]) // Separator ("...")
                .concat(range(totalPages - sideWidth + 1, totalPages));
        }

        if (page >= totalPages - sideWidth - 1 - rightWidth) {
            return range(1, sideWidth)
                .concat([0]) // Separator ("...")
                .concat(range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
        }

        return range(1, sideWidth)
            .concat([0]) // Separator ("...")
            .concat(range(page - leftWidth, page + rightWidth))
            .concat([0]) // Separator ("...")
            .concat(range(totalPages - sideWidth + 1, totalPages));
    }

    // Function to show paginated posts
    function showPaginatedPosts(posts, page) {
        const totalPosts = posts.length;
        const totalPages = Math.ceil(totalPosts / limitPerPage);
        const paginationSize = 5; // Number of visible page links

        // Hide pagination if there is only one page
        if (totalPosts < limitPerPage) {
            $(".pagination").hide();
        }

        // Hide all posts and show only the current page's posts
        posts.hide().slice((page - 1) * limitPerPage, page * limitPerPage).show();

        // Clear and regenerate pagination links
        $(".pagination").empty();
        $(".pagination").append(
            $("<li>").addClass("page-item previous-page").append(
                $("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("Prev")
            )
        );

        getPageList(totalPages, page, paginationSize).forEach(item => {
            $(".pagination").append(
                $("<li>")
                    .addClass("page-item")
                    .addClass(item ? "current-page" : "dots")
                    .toggleClass("active", item === page)
                    .append(
                        $("<a>")
                            .addClass("page-link")
                            .attr({ href: "javascript:void(0)" })
                            .text(item || "...")
                    )
            );
        });

        $(".pagination").append(
            $("<li>").addClass("page-item next-page").append(
                $("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("Next")
            )
        );

        // Enable or disable "Prev" and "Next" buttons
        $(".previous-page").toggleClass("disabled", page === 1);
        $(".next-page").toggleClass("disabled", page === totalPages);
    }

    // Handle category filter click
    $(".other-categories").click(function () {
        const value = $(this).attr("filter");
        let filteredPosts;

        if (value === "all") {
            filteredPosts = $(".post-item");
        } else {
            filteredPosts = $(".post-item").filter("." + value);
            $(".post-item").not("." + value).hide();
        }

        // Show paginated posts for the filtered category
        currentPage = 1; // Reset to the first page for a new filter
        showPaginatedPosts(filteredPosts, currentPage);

        // Add active class to the selected category
        $(this).addClass("selected-category").siblings().removeClass("selected-category");

        // Handle pagination click
        $(".pagination").off("click").on("click", "li.page-item", function () {
            if ($(this).hasClass("disabled") || $(this).hasClass("active")) return;

            if ($(this).hasClass("previous-page")) {
                currentPage--;
            } else if ($(this).hasClass("next-page")) {
                currentPage++;
            } else {
                currentPage = parseInt($(this).text());
            }

            // Update the posts shown for the current page
            showPaginatedPosts(filteredPosts, currentPage);
        });
    });

    // Trigger the "all" filter by default on page load
    $(".other-categories[filter='all']").trigger("click");
});


/*
------------------------------------------------------------
Pagination
------------------------------------------------------------
*/
function getPageList(totalPages, page, maxLength) {

    // Helper function to create a range of numbers
    function range(start, end) {
        return Array.from(Array(end - start + 1), (_, i) => i + start);
    }

    // Define how many pages to show on the sides and how many in the middle
    var sideWidth = maxLength < 9 ? 1 : 2; // Number of pages on each side
    var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1; // Pages to show to the left of the current page
    var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1; // Pages to show to the right of the current page

    // Case 1: If the total pages fit within the max length, display all pages
    if (totalPages <= maxLength) {
        return range(1, totalPages);
    }

    // Case 2: If the current page is near the start
    if (page <= maxLength - sideWidth - 1 - rightWidth) {
        return range(1, maxLength - sideWidth - 1)
            .concat([0]) // Add a separator (e.g., "...")
            .concat(range(totalPages - sideWidth + 1, totalPages)); // Add the ending pages
    }

    // Case 3: If the current page is near the end
    if (page >= totalPages - sideWidth - 1 - rightWidth) {
        return range(1, sideWidth) // Add the starting pages
            .concat([0]) // Add a separator
            .concat(
                range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages) // Add pages near the end
            );
    }

    // Case 4: If the current page is somewhere in the middle
    return range(1, sideWidth) // Starting pages
        .concat([0]) // Separator
        .concat(range(page - leftWidth, page + rightWidth)) // Middle pages around the current page
        .concat([0]) // Separator
        .concat(range(totalPages - sideWidth + 1, totalPages)); // Ending pages
}

$(function () {

    // Get the total number of items to paginate
    var numberOfItems = $(".posts .post-item").length;

    // Define the limit of items per page
    var limitPerPage = 1;

    // Calculate the total number of pages
    var totalPages = Math.ceil(numberOfItems / limitPerPage);

    // Number of visible page links in the pagination bar
    var paginationSize = 2;

    // Track the currently active page
    var currentPage;

    // Function to display a specific page
    function showPage(whichPage) {
        if (whichPage < 1 || whichPage > totalPages) return false; // Ignore invalid page numbers
        currentPage = whichPage;

        // Hide all items and show only the items for the current page
        $(".posts .post-item")
            .hide()
            .slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage)
            .show();

        // Clear existing page links and regenerate them
        $(".pagination li").slice(1, -1).remove();

        // Generate the pagination links for the current page
        getPageList(totalPages, currentPage, paginationSize).forEach(item => {
            $("<li>")
                .addClass("page-item")
                .addClass(item ? "current-page" : "dots") // Add "dots" class for separators (e.g., "...")
                .toggleClass("active", item === currentPage) // Highlight the active page
                .append(
                    $("<a>")
                        .addClass("page-link")
                        .attr({
                            href: "javascript:void(0)" // Prevent default link behavior
                        })
                        .text(item || "...") // Show the page number or "..."
                )
                .insertBefore(".next-page"); // Insert the new page link before the "Next" button
        });

        // Enable or disable "Previous" and "Next" buttons based on the current page
        $(".previous-page").toggleClass("disabled", currentPage === 1);
        $(".next-page").toggleClass("disabled", currentPage === totalPages);
        return true;
    }

    // Add the "Previous" and "Next" buttons to the pagination
    $(".pagination").append(
        $("<li>").addClass("page-item").addClass("previous-page").append(
            $("<a>")
                .addClass("page-link")
                .attr({
                    href: "javascript:void(0)" // Prevent default link behavior
                })
                .text("Prev") // Label for the "Previous" button
        ),
        $("<li>").addClass("page-item").addClass("next-page").append(
            $("<a>")
                .addClass("page-link")
                .attr({
                    href: "javascript:void(0)" // Prevent default link behavior
                })
                .text("Next") // Label for the "Next" button
        )
    );

    // Initially display the first page
    $(".post-item").show();
    showPage(1);

    // Handle click events for page numbers
    $(document).on("click", ".pagination li.current-page:not(.active)", function () {
        return showPage(+$(this).text()); // Navigate to the clicked page
    });

    // Handle click event for the "Next" button
    $(".next-page").on("click", function () {
        return showPage(currentPage + 1); // Navigate to the next page
    });

    // Handle click event for the "Previous" button
    $(".previous-page").on("click", function () {
        return showPage(currentPage - 1); // Navigate to the previous page
    });
});