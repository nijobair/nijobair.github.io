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