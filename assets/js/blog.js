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
Post Filters & Pagination
------------------------------------------------------------
*/
$(document).ready(function () {
    // Initialize variables for pagination
    const limitPerPage = 13; // Number of posts per page
    let currentPage = 1;
    let filteredPosts = $(".post-item");

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
        } else {
            $(".pagination").show();
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

    // Function to handle pagination click
    function handlePaginationClick() {
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
    }

    // Function to handle category filter click
    function handleCategoryFilterClick() {
        $(".other-categories").click(function () {
            const value = $(this).attr("filter");

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
            handlePaginationClick();
        });
    }

    // Initialize the default filter and pagination
    handleCategoryFilterClick();
    $(".other-categories[filter='all']").trigger("click");
});