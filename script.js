/* =====================================================
   DATA
===================================================== */

let cart = [];

let orders = [];

let notifications = [];

let coins = 0;

let currentUser = {
    name: "",
    address: "",
    password: ""
};


/* =====================================================
   LOADING
===================================================== */

window.addEventListener("load", function () {

    setTimeout(function () {

        document.getElementById(
            "loadingScreen"
        ).style.display = "none";

        document.getElementById(
            "loginPage"
        ).style.display = "flex";

    }, 2700);

});


/* =====================================================
   LOGIN
===================================================== */

function login() {

    const name =
        document
            .getElementById("loginName")
            .value
            .trim();

    const address =
        document
            .getElementById("loginAddress")
            .value
            .trim();

    const password =
        document
            .getElementById("loginPassword")
            .value
            .trim();


    if (
        name === "" ||
        address === "" ||
        password === ""
    ) {

        alert(
            "Jeneng, alamat, lan password kudu diisi kabeh yaa!"
        );

        return;
    }


    currentUser.name =
        name;

    currentUser.address =
        address;

    currentUser.password =
        password;


    document.getElementById(
        "userName"
    ).textContent =
        name;


    document.getElementById(
        "checkoutName"
    ).textContent =
        name;


    document.getElementById(
        "checkoutAddress"
    ).textContent =
        address;


    document.getElementById(
        "loginPage"
    ).style.display =
        "none";


    document.getElementById(
        "mainPage"
    ).style.display =
        "block";


    addNotification(
        "Sugeng rawuh ing LARISI!",
        "Kowe saiki wis mlebu ing akun LARISI."
    );

}


/* =====================================================
   FORMAT RUPIAH
===================================================== */

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }
    ).format(number);

}


/* =====================================================
   CART
===================================================== */

function addToCart(
    name,
    price,
    icon
) {

    const existing =
        cart.find(
            item =>
                item.name === name
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            icon: icon,

            quantity: 1

        });

    }


    updateCart();


    alert(
        name +
        " wis dilebokna menyang keranjang 🛒"
    );

}


/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );

    const cartCount =
        document.getElementById(
            "cartCount"
        );

    const cartSubtotal =
        document.getElementById(
            "cartSubtotal"
        );

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                🛒

                <br><br>

                Keranjangmu isih kosong.

            </div>

        `;


        cartCount.textContent =
            "0";


        cartSubtotal.textContent =
            formatRupiah(0);


        cartTotal.textContent =
            formatRupiah(0);


        return;

    }


    let subtotal = 0;

    let quantity = 0;


    cartItems.innerHTML = "";


    cart.forEach(
        function(item, index) {

            const itemTotal =
                item.price *
                item.quantity;


            subtotal +=
                itemTotal;


            quantity +=
                item.quantity;


            cartItems.innerHTML += `

                <div class="cart-item">

                    <div class="cart-item-icon">
                        ${item.icon}
                    </div>

                    <div class="cart-item-info">

                        <div class="cart-item-name">

                            ${item.name}

                        </div>

                        <div class="cart-item-price">

                            ${formatRupiah(
                                item.price
                            )}

                        </div>

                        <div class="qty">

                            <button
                                onclick="changeQuantity(
                                    ${index},
                                    -1
                                )">

                                −

                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                onclick="changeQuantity(
                                    ${index},
                                    1
                                )">

                                +

                            </button>

                        </div>

                    </div>

                </div>

            `;

        }
    );


    const estimatedTotal =
        subtotal * 0.5;


    cartCount.textContent =
        quantity;


    cartSubtotal.textContent =
        formatRupiah(subtotal);


    cartTotal.textContent =
        formatRupiah(
            estimatedTotal
        );

}


/* =====================================================
   QUANTITY
===================================================== */

function changeQuantity(
    index,
    amount
) {

    cart[index].quantity +=
        amount;


    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(
            index,
            1
        );

    }


    updateCart();

}


/* =====================================================
   CART PANEL
===================================================== */

function openCart() {

    document
        .getElementById("cartPanel")
        .classList
        .add("open");

}


function closeCart() {

    document
        .getElementById("cartPanel")
        .classList
        .remove("open");

}


/* =====================================================
   FAVORITE
===================================================== */

function favorite(button) {

    if (
        button.textContent.trim()
        === "♡"
    ) {

        button.textContent =
            "♥";

        button.style.color =
            "#ff1744";

    } else {

        button.textContent =
            "♡";

        button.style.color =
            "";

    }

}


/* =====================================================
   SEARCH
===================================================== */

const searchInput =
    document.getElementById(
        "searchInput"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchSuggestion
    );


    searchInput.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Escape"
            ) {

                document.getElementById(
                    "suggestions"
                ).style.display = "none";

            }

        }
    );

}


/* =====================================================
   SEARCH SUGGESTION
===================================================== */

function searchSuggestion() {

    const input =
        document
            .getElementById(
                "searchInput"
            )
            .value
            .toLowerCase()
            .trim();


    const products =
        document.querySelectorAll(
            "#productList .product"
        );


    const suggestions =
        document.getElementById(
            "suggestions"
        );


    suggestions.innerHTML = "";


    /*
       KALO KOSONG
    */

    if (input === "") {

        products.forEach(
            function(product) {

                product.style.display =
                    "";

            }
        );


        suggestions.style.display =
            "none";


        return;

    }


    /*
       CARI PRODUK
    */

    const matches = [];


    products.forEach(
        function(product) {

            const productName =
                product
                    .getAttribute(
                        "data-name"
                    )
                    .toLowerCase();


            const category =
                product
                    .getAttribute(
                        "data-category"
                    )
                    .toLowerCase();


            const productTitle =
                product
                    .querySelector("h3")
                    .textContent;


            if (
                productName.includes(input) ||
                category.includes(input) ||
                productTitle
                    .toLowerCase()
                    .includes(input)
            ) {

                matches.push({
                    product:
                        product,
                    title:
                        productTitle
                });

            }

        }
    );


    /*
       TAMPILKAN PRODUK YANG COCOK
    */

    products.forEach(
        function(product) {

            const found =
                matches.some(
                    match =>
                        match.product ===
                        product
                );


            product.style.display =
                found
                    ? ""
                    : "none";

        }
    );


    /*
       BUAT REKOMENDASI
    */

    if (
        matches.length === 0
    ) {

        suggestions.innerHTML = `

            <div class="suggestion-item">

                😕 Barang ora ditemokake

            </div>

        `;

        suggestions.style.display =
            "block";

        return;

    }


    /*
       MAKSIMAL 6 SARAN
    */

    matches
        .slice(0, 6)
        .forEach(
            function(match) {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "suggestion-item";


                button.innerHTML =
                    "🔎 " +
                    match.title;


                /*
                   BAGIAN PENTING:
                   KLIK REKOMENDASI
                */

                button.addEventListener(
                    "click",
                    function(event) {

                        event.preventDefault();

                        event.stopPropagation();


                        selectSuggestion(
                            match.title
                        );

                    }
                );


                suggestions.appendChild(
                    button
                );

            }
        );


    suggestions.style.display =
        "block";

}


/* =====================================================
   PILIH REKOMENDASI
===================================================== */

function selectSuggestion(
    productName
) {

    const input =
        document.getElementById(
            "searchInput"
        );


    const suggestions =
        document.getElementById(
            "suggestions"
        );


    input.value =
        productName;


    /*
       CARI PRODUK DENGAN NAMA
    */

    const products =
        document.querySelectorAll(
            "#productList .product"
        );


    products.forEach(
        function(product) {

            const title =
                product
                    .querySelector("h3")
                    .textContent
                    .toLowerCase();


            const wanted =
                productName
                    .toLowerCase();


            if (
                title === wanted
            ) {

                product.style.display =
                    "";

                product.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            } else {

                product.style.display =
                    "none";

            }

        }
    );


    suggestions.style.display =
        "none";

}


/* =====================================================
   KLIK DI LUAR SEARCH
===================================================== */

document.addEventListener(
    "click",
    function(event) {

        const searchBox =
            document.querySelector(
                ".search-box"
            );


        if (
            searchBox &&
            !searchBox.contains(
                event.target
            )
        ) {

            document.getElementById(
                "suggestions"
            ).style.display =
                "none";

        }

    }
);


/* =====================================================
   CATEGORY
===================================================== */

function filterCategory(
    category,
    button
) {

    const products =
        document.querySelectorAll(
            "#productList .product"
        );


    const categories =
        document.querySelectorAll(
            ".category"
        );


    categories.forEach(
        function(item) {

            item.classList.remove(
                "active"
            );

        }
    );


    button.classList.add(
        "active"
    );


    document.getElementById(
        "searchInput"
    ).value = "";


    document.getElementById(
        "suggestions"
    ).style.display =
        "none";


    products.forEach(
        function(product) {

            const productCategory =
                product.getAttribute(
                    "data-category"
                );


            if (
                category === "all" ||
                productCategory === category
            ) {

                product.style.display =
                    "";

            } else {

                product.style.display =
                    "none";

            }

        }
    );

}


/* =====================================================
   SCROLL PRODUK
===================================================== */

function scrollToProducts() {

    document
        .getElementById(
            "productSection"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   CHECKOUT
===================================================== */

function openCheckout() {

    if (
        cart.length === 0
    ) {

        alert(
            "Keranjangmu isih kosong!"
        );

        return;

    }


    closeCart();


    document.getElementById(
        "checkoutOverlay"
    ).style.display =
        "flex";


    renderCheckout();

}


function closeCheckout() {

    document.getElementById(
        "checkoutOverlay"
    ).style.display =
        "none";

}


/* =====================================================
   RENDER CHECKOUT
===================================================== */

function renderCheckout() {

    const container =
        document.getElementById(
            "checkoutProducts"
        );


    container.innerHTML = "";


    cart.forEach(
        function(item) {

            container.innerHTML += `

                <div class="checkout-product">

                    <span>

                        ${item.icon}
                        ${item.name}

                        × ${item.quantity}

                    </span>

                    <strong>

                        ${formatRupiah(
                            item.price *
                            item.quantity
                        )}

                    </strong>

                </div>

            `;

        }
    );


    document.getElementById(
        "checkoutName"
    ).textContent =
        currentUser.name;


    document.getElementById(
        "checkoutAddress"
    ).textContent =
        currentUser.address;


    document.getElementById(
        "checkoutCoins"
    ).textContent =
        coins;


    document.getElementById(
        "useCoins"
    ).checked =
        false;


    calculateCheckout();

}


/* =====================================================
   CALCULATE CHECKOUT
===================================================== */

function calculateCheckout() {

    let subtotal = 0;


    cart.forEach(
        function(item) {

            subtotal +=
                item.price *
                item.quantity;

        }
    );


    /*
       POTONGAN 50%
    */

    const discount =
        subtotal * 0.5;


    /*
       GRATIS ONGKIR 100%
    */

    const shipping =
        0;


    /*
       KOIN
    */

    const useCoins =
        document
            .getElementById(
                "useCoins"
            )
            .checked;


    let coinDiscount = 0;


    if (useCoins) {

        const maximumCoinDiscount =
            Math.max(
                subtotal -
                discount,
                0
            );


        coinDiscount =
            Math.min(
                coins * 1000,
                maximumCoinDiscount
            );

    }


    let total =
        subtotal -
        discount -
        coinDiscount;


    if (total < 0) {

        total = 0;

    }


    document.getElementById(
        "checkoutSubtotal"
    ).textContent =
        formatRupiah(
            subtotal
        );


    document.getElementById(
        "checkoutDiscount"
    ).textContent =
        "- " +
        formatRupiah(
            discount
        );


    document.getElementById(
        "checkoutShipping"
    ).textContent =
        "Gratis";


    document.getElementById(
        "checkoutCoinDiscount"
    ).textContent =
        "- " +
        formatRupiah(
            coinDiscount
        );


    document.getElementById(
        "checkoutTotal"
    ).textContent =
        formatRupiah(
            total
        );


    return {

        subtotal:
            subtotal,

        discount:
            discount,

        shipping:
            shipping,

        coinDiscount:
            coinDiscount,

        total:
            total

    };

}


/* =====================================================
   MAKE ORDER
===================================================== */

function makeOrder() {

    if (
        cart.length === 0
    ) {

        alert(
            "Ora ana barang ing keranjang."
        );

        return;

    }


    const calculation =
        calculateCheckout();


    const payment =
        document.getElementById(
            "payment"
        ).value;


    const note =
        document.getElementById(
            "orderNote"
        ).value
        .trim();


    const useCoins =
        document.getElementById(
            "useCoins"
        ).checked;


    /*
       COIN HASIL PEMBELIAN
    */

    const earnedCoins =
        Math.floor(
            calculation.subtotal /
            10000
        ) * 10;


    /*
       COIN YANG DIGUNAKAN
    */

    let usedCoins = 0;


    if (useCoins) {

        usedCoins =
            Math.floor(
                calculation.coinDiscount /
                1000
            );


        coins -=
            usedCoins;

    }


    /*
       TAMBAH KOIN HASIL PEMBELIAN
    */

    coins +=
        earnedCoins;


    /*
       NOMOR PESANAN
    */

    const orderId =
        "LR" +
        Date.now()
            .toString()
            .slice(-8);


    /*
       SIMPAN ORDER
    */

    const newOrder = {

        id:
            orderId,

        items:
            cart.map(
                function(item) {

                    return {

                        name:
                            item.name,

                        price:
                            item.price,

                        quantity:
                            item.quantity,

                        icon:
                            item.icon

                    };

                }
            ),

        subtotal:
            calculation.subtotal,

        discount:
            calculation.discount,

        coinDiscount:
            calculation.coinDiscount,

        total:
            calculation.total,

        payment:
            payment,

        note:
            note,

        statusIndex:
            0,

        date:
            new Date()
                .toLocaleString(
                    "id-ID"
                )

    };


    orders.unshift(
        newOrder
    );


    /*
       NOTIFIKASI AWAL
    */

    addNotification(

        "Pesanan digawe 🎉",

        "Pesanan #" +
        orderId +
        " wis digawe lan lagi diproses."

    );


    /*
       SIMULASI STATUS
    */

    createOrderNotifications(
        newOrder
    );


    /*
       KOSONGKAN KERANJANG
    */

    cart = [];


    updateCart();


    updateCoinDisplay();


    document.getElementById(
        "orderNote"
    ).value = "";


    document.getElementById(
        "useCoins"
    ).checked = false;


    closeCheckout();


    alert(

        "Pesanan berhasil digawe! 🎉\n\n" +

        "Nomor pesanan: #" +
        orderId +

        "\nTotal: " +

        formatRupiah(
            calculation.total
        ) +

        "\n\nKowe entuk " +
        earnedCoins +
        " koin."

    );


    openOrders();

}


/* =====================================================
   COIN
===================================================== */

function updateCoinDisplay() {

    document.getElementById(
        "coinCount"
    ).textContent =
        coins;


    const checkoutCoins =
        document.getElementById(
            "checkoutCoins"
        );


    if (checkoutCoins) {

        checkoutCoins.textContent =
            coins;

    }

}


/* =====================================================
   NOTIFICATION
===================================================== */

function addNotification(
    title,
    message
) {

    notifications.unshift({

        title:
            title,

        message:
            message,

        time:
            new Date()
                .toLocaleTimeString(
                    "id-ID",
                    {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                ),

        unread:
            true

    });


    updateNotificationCount();

    renderNotifications();

}


function updateNotificationCount() {

    const unread =
        notifications.filter(
            function(notification) {

                return notification.unread;

            }
        ).length;


    document.getElementById(
        "notificationCount"
    ).textContent =
        unread;

}


function renderNotifications() {

    const list =
        document.getElementById(
            "notificationList"
        );


    if (
        notifications.length === 0
    ) {

        list.innerHTML = `

            <div class="notification-empty">

                🔔

                <br><br>

                Durung ana notifikasi.

            </div>

        `;

        return;

    }


    list.innerHTML = "";


    notifications.forEach(
        function(
            notification,
            index
        ) {

            list.innerHTML += `

                <div
                    class="notification-item"
                    onclick="readNotification(
                        ${index}
                    )">

                    <strong>

                        ${notification.title}

                    </strong>

                    <p>

                        ${notification.message}

                    </p>

                    <div class="notification-time">

                        ${notification.time}

                    </div>

                </div>

            `;

        }
    );

}


function openNotifications() {

    const panel =
        document.getElementById(
            "notificationPanel"
        );


    panel.style.display =
        "block";


    notifications.forEach(
        function(notification) {

            notification.unread =
                false;

        }
    );


    updateNotificationCount();

    renderNotifications();

}


function closeNotifications() {

    document.getElementById(
        "notificationPanel"
    ).style.display =
        "none";

}


function readNotification(index) {

    notifications[index].unread =
        false;


    updateNotificationCount();

    renderNotifications();

}


/* =====================================================
   ORDER STATUS
===================================================== */

function createOrderNotifications(
    order
) {

    /*
       5 DETIK
       DIPROSES
    */

    setTimeout(
        function() {

            order.statusIndex =
                1;


            addNotification(

                "Pesanan lagi diproses 📦",

                "Pesanan #" +
                order.id +
                " lagi disiapke penjual."

            );


            refreshOrders();

        },
        5000
    );


    /*
       10 DETIK
       DIKIRIM
    */

    setTimeout(
        function() {

            order.statusIndex =
                2;


            addNotification(

                "Pesanan wis dikirim 🚚",

                "Pesanan #" +
                order.id +
                " wis dikirim lan lagi menyang alamatmu."

            );


            refreshOrders();

        },
        10000
    );


    /*
       20 DETIK
       SAMPAI
    */

    setTimeout(
        function() {

            order.statusIndex =
                3;


            addNotification(

                "Pesanan wis tekan omah 🎉",

                "Pesanan #" +
                order.id +
                " wis rampung ditampa."

            );


            refreshOrders();

        },
        20000
    );

}


/* =====================================================
   ORDER PANEL
===================================================== */

function openOrders() {

    document.getElementById(
        "orderPanel"
    ).style.display =
        "flex";


    renderOrders();

}


function closeOrders() {

    document.getElementById(
        "orderPanel"
    ).style.display =
        "none";

}


/* =====================================================
   RENDER ORDERS
===================================================== */

function renderOrders() {

    const orderList =
        document.getElementById(
            "orderList"
        );


    if (
        orders.length === 0
    ) {

        orderList.innerHTML = `

            <div class="notification-empty">

                📦

                <br><br>

                Durung ana pesanan.

                <br><br>

                Ayo blanja sek!

            </div>

        `;

        return;

    }


    orderList.innerHTML = "";


    orders.forEach(
        function(order) {

            const steps = [

                "Digawe",

                "Diproses",

                "Dikirim",

                "Wis tekan"

            ];


            let productsText = "";


            order.items.forEach(
                function(item) {

                    productsText += `

                        ${item.icon}
                        ${item.name}
                        ×${item.quantity}

                        <br>

                    `;

                }
            );


            let stepsHTML = "";


            steps.forEach(
                function(
                    step,
                    index
                ) {

                    stepsHTML += `

                        <div class="
                            step
                            ${
                                index <=
                                order.statusIndex
                                    ? "active"
                                    : ""
                            }
                        ">

                            <div class="
                                step-circle
                            ">

                                ${
                                    index <=
                                    order.statusIndex
                                        ? "✓"
                                        : ""
                                }

                            </div>

                            ${step}

                        </div>

                    `;

                }
            );


            let statusText;


            if (
                order.statusIndex === 0
            ) {

                statusText =
                    "Pesanan digawe";

            } else if (
                order.statusIndex === 1
            ) {

                statusText =
                    "Pesanan lagi diproses";

            } else if (
                order.statusIndex === 2
            ) {

                statusText =
                    "Pesanan lagi dikirim";

            } else {

                statusText =
                    "Pesanan wis tekan omah";

            }


            orderList.innerHTML += `

                <div class="order-card">

                    <div class="order-id">

                        No. Pesanan:

                        <strong>
                            #${order.id}
                        </strong>

                    </div>

                    <br>

                    <div>
                        ${productsText}
                    </div>

                    <div class="order-status">

                        ${statusText}

                    </div>

                    <div class="progress">

                        ${stepsHTML}

                    </div>

                    <div class="order-total">

                        Total:
                        ${formatRupiah(
                            order.total
                        )}

                    </div>

                    <div
                        style="
                            margin-top:8px;
                            font-size:13px;
                            color:#777;
                        ">

                        💳 ${order.payment}

                    </div>

                    <div
                        style="
                            margin-top:5px;
                            font-size:12px;
                            color:#999;
                        ">

                        ${order.date}

                    </div>

                    ${
                        order.note
                            ? `
                                <div
                                    style="
                                        margin-top:8px;
                                        font-size:12px;
                                        color:#777;
                                    ">

                                    📝 Catatan:
                                    ${order.note}

                                </div>
                            `
                            : ""
                    }

                </div>

            `;

        }
    );

}


/* =====================================================
   REFRESH ORDER
===================================================== */

function refreshOrders() {

    if (
        document.getElementById(
            "orderPanel"
        ).style.display ===
        "flex"
    ) {

        renderOrders();

    }

}


/* =====================================================
   FLASH SALE TIMER
===================================================== */

let flashSeconds =
    2 * 60 * 60;


function updateTimer() {

    if (
        flashSeconds <= 0
    ) {

        document.getElementById(
            "countdown"
        ).textContent =
            "00:00:00";

        return;

    }


    flashSeconds--;


    const hours =
        Math.floor(
            flashSeconds /
            3600
        );


    const minutes =
        Math.floor(
            (flashSeconds % 3600) /
            60
        );


    const seconds =
        flashSeconds % 60;


    document.getElementById(
        "countdown"
    ).textContent =

        String(hours)
            .padStart(2, "0")

        + ":" +

        String(minutes)
            .padStart(2, "0")

        + ":" +

        String(seconds)
            .padStart(2, "0");

}


setInterval(
    updateTimer,
    1000
);


/* =====================================================
   NOTIFIKASI PROMO
===================================================== */

setTimeout(
    function() {

        addNotification(

            "Promo LARISI 🎁",

            "Gratis ongkir 100% lan potongan 50% wis otomatis aktif."

        );

    },
    3500
);


/* =====================================================
   INIT
===================================================== */

updateCart();

updateCoinDisplay();

renderNotifications();