"use client";
import React from "react";

function MainComponent() {
  const [currentPage, setCurrentPage] = React.useState("home");
  const [cart, setCart] = React.useState([]);
  const [showCart, setShowCart] = React.useState(false);
  const [orderComplete, setOrderComplete] = React.useState(false);
  const [menuFilter, setMenuFilter] = React.useState("all");
  const [showCheckout, setShowCheckout] = React.useState(false);
  const [customerInfo, setCustomerInfo] = React.useState({
    name: "",
    email: "",
    phone: "",
    zipCode: "",
    address: "",
    city: "",
    paymentMethod: "card",
  });
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);

  // Mock menu data
  const menuItems = [
    // Burgers
    {
      id: 1,
      name: "The Godfather Burger",
      description: "Premium beef patty with aged cheddar, crispy bacon, and our secret sauce comes with 1l drink of choice and portion of fries",
      price: 165.00,
      category: "burgers",
      image: "/godfather-burger.jpg",
    },
    {
      id: 2,
      name: "Capo's Double Stack",
      description: "Two juicy beef patties, cheddar, lettuce, tomato, and house sauce served with 500ml drink of choice and portion of fries",
      price: 120.00,
      category: "burgers",
      image: "/capos-double-stack.jpg",
    },
    {
      id: 3,
      name: "Midnight Bacon Burger",
      description: "Beef patty, crispy bacon, caramelized onions, and smoky BBQ sauce served 500ml drink of choice and portion of fries",
      price: 100.00,
      category: "burgers",
      image: "/midnight-bacon-burger.jpg",
    },
    // Wings
    {
      id: 4,
      name: "Scarface Spicy Wings",
      description: "Fiery hot wings with our signature red sauce and blue cheese dip",
      price: 120.00,
      category: "wings",
      image: "/scarface-spicy-wings.jpg",
    },
    {
      id: 5,
      name: "Lemon Pepper Hit Wings",
      description: "Crispy wings tossed in lemon pepper seasoning.",
      price: 120.00,
      category: "wings",
      image: "/lemon-pepper-hit-wings.jpg",
    },
    {
      id: 6,
      name: "Honey Garlic Mob Wings",
      description: "Sweet and sticky honey garlic wings with a hint of spice.",
      price: 140.00,
      category: "wings",
      image: "/honey-garlic-mob-wings.jpg",
    },
    // Wraps
    {
      id: 7,
      name: "Capone's Classic Wrap",
      description: "Grilled chicken, fresh lettuce, tomatoes, and garlic aioli in a warm tortilla",
      price: 110.00,
      category: "wraps",
      image: "/capones-classic-wrap.jpg",
    },
    {
      id: 8,
      name: "Buffalo Boss Wrap",
      description: "Buffalo chicken, ranch, lettuce, and cheddar in a flour wrap.",
      price: 110.00,
      category: "wraps",
      image: "/buffalo-boss-wrap.jpg",
    },
    {
      id: 9,
      name: "Veggie Undercover Wrap",
      description: "Grilled veggies, hummus, and feta cheese in a spinach wrap.",
      price: 110.00,
      category: "wraps",
      image: "/veggie-undercover-wrap.jpg",
    },
    // Sides
    {
      id: 10,
      name: "Mob Boss Mac & Cheese",
      description: "Creamy three-cheese mac with crispy breadcrumbs and truffle oil",
      price: 120.00,
      category: "sides",
      image: "/mob-boss-mac-cheese.jpg",
    },
    {
      id: 11,
      name: "Truffle Fries",
      description: "Crispy fries tossed in truffle oil and parmesan.",
      price: 60.00,
      category: "sides",
      image: "/truffle-fries.jpg",
    },
    {
      id: 12,
      name: "Loaded Mafia Nachos",
      description: "Tortilla chips loaded with cheese, jalapenos, and salsa.",
      price: 120.00,
      category: "sides",
      image: "/loaded-mafia-nachos.jpg",
    },
    // Sandwiches
    {
      id: 13,
      name: "Hitman's Hot Sandwich",
      description: "Slow-cooked pulled pork with coleslaw and BBQ sauce on brioche",
      price: 120.00,
      category: "sandwiches",
      image: "/hitmans-hot-sandwich.jpg",
    },
    {
      id: 14,
      name: "Chicken Parm Hero",
      description: "Crispy chicken, marinara, and mozzarella on a toasted roll.",
      price: 120.00,
      category: "sandwiches",
      image: "/chicken-parm-hero.jpg",
    },
    {
      id: 15,
      name: "Classic Club Mobwich",
      description: "Turkey, bacon, lettuce, tomato, and mayo on toasted bread.",
      price: 120.00,
      category: "sandwiches",
      image: "/classic-club-mobwich.jpg",
    },
  ];

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const getTax = () => {
    return (getTotalPrice() * 0.08).toFixed(2);
  };

  const getDeliveryFee = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0) >
      50
      ? 0
      : 5.99;
  };

  const getFinalTotal = () => {
    return (getTotalPrice() + getTax() + getDeliveryFee()).toFixed(2);
  };

  const filteredMenu =
    menuFilter === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === menuFilter);

  const handleCheckout = () => {
    setOrderComplete(true);
    setCart([]);
    setShowCart(false);
    setTimeout(() => setOrderComplete(false), 5000);
  };

  // Homepage Component
  const HomePage = () => (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Logo */}
      <div className="relative py-20 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-900/30 to-black"></div>

        {/* Textured background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #ef4444 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #dc2626 0%, transparent 50%),
                           linear-gradient(45deg, transparent 40%, rgba(239, 68, 68, 0.1) 50%, transparent 60%)`,
          }}
        ></div>

        <div className="relative z-10 text-center px-4 mb-16">
          {/* Logo */}
          <div className="mb-8">
            <img
              src="/logo trnsparent.png"
              alt="Hungry Busters Logo"
              className="mx-auto h-96 md:h-[36rem] w-auto glow-red"
              style={{
                filter: "drop-shadow(0 0 40px rgba(239, 68, 68, 0.8))",
              }}
            />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-center mb-12 text-white glow-red" style={{
            textShadow: "0 0 16px #ef4444, 0 0 32px #ef4444, 0 0 48px #ef4444"
          }}>
            BUSTING HUNGER, ONE BITE AT A TIME
          </h2>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 right-20 w-1 h-1 bg-red-400 rounded-full animate-ping delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-red-300 rounded-full animate-ping delay-2000"></div>
      </div>

      {/* Interactive Menu Section */}
      <div className="bg-black text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-12 text-white glow-red" style={{ textShadow: "0 0 16px #ef4444, 0 0 32px #ef4444, 0 0 48px #ef4444" }}>
            THE MENU
          </h2>

          {/* Food Section Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["all", "burgers", "wings", "wraps", "sides", "sandwiches"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setMenuFilter(filter)}
                  className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                    menuFilter === filter
                      ? "bg-red-600 text-white glow-button transform scale-105"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              )
            )}
          </div>

          {/* Enhanced Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-500 hover:shadow-red border border-gray-800 hover:border-red-500 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    HOT
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-400 transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-white glow-red">
                      R{item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:glow-button hover:transform hover:scale-105 active:scale-95"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-gray-400 mb-6">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <button
              onClick={() => setCurrentPage("contact")}
              className="bg-transparent border-2 border-red-600 text-red-500 hover:bg-red-600 hover:text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:glow-button"
            >
              CUSTOM CATERING
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Menu Component
  const MenuPage = () => (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-12 text-white glow-red" style={{ textShadow: "0 0 16px #ef4444, 0 0 32px #ef4444, 0 0 48px #ef4444" }}>
          THE MENU
        </h2>

        {/* Food Section Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {["all", "burgers", "wings", "wraps", "sides", "sandwiches"].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setMenuFilter(filter)}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                  menuFilter === filter
                    ? "bg-red-600 text-white glow-button transform scale-105"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-red border border-gray-800 hover:border-red-500 flex flex-col h-full"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  HOT
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2 text-white">
                  {item.name}
                </h3>
                <p className="text-gray-400 mb-4 text-sm">{item.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-2xl font-bold text-white glow-red">
                    R{item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 hover:glow-button"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // About Component
  const AboutPage = () => (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-12 text-white glow-red" style={{ textShadow: "0 0 16px #ef4444, 0 0 32px #ef4444, 0 0 48px #ef4444" }}>
          OUR STORY
        </h2>
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Born in the shadows of the city&apos;s hunger crisis,{" "}
            <span className="text-red-500 font-bold">Hungry Busters</span>{" "}
            emerged as the ultimate solution. We&apos;re not just another catering
            service – we&apos;re food vigilantes, taking down hunger one perfectly
            crafted meal at a time.
          </p>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Our crew of culinary masterminds operates from the finest kitchens,
            using only premium ingredients and time-tested recipes that have
            been passed down through generations of food artisans.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            When hunger strikes, we strike back. Fast, reliable, and with an
            attitude that matches our bold flavors. Welcome to the family.
          </p>
        </div>
      </div>
    </div>
  );

  // Contact Component
  const ContactPage = () => (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-12 text-white glow-red" style={{ textShadow: "0 0 16px #ef4444, 0 0 32px #ef4444, 0 0 48px #ef4444" }}>
          CONTACT US
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
            <h3 className="text-2xl font-bold mb-6 text-red-500">
              Get In Touch
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Phone</p>
                <p className="text-white font-bold">(555) HUNGRY-1</p>
              </div>
              <div>
                <p className="text-gray-400">Email</p>
                <p className="text-white font-bold">orders@hungrybusters.com</p>
              </div>
              <div>
                <p className="text-gray-400">Address</p>
                <p className="text-white font-bold">
                  123 Flavor Street
                  <br />
                  Taste City, TC 12345
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
            <h3 className="text-2xl font-bold mb-6 text-red-500">
              Catering Inquiry
            </h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
              />
              <textarea
                placeholder="Tell us about your event"
                rows="4"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-all duration-300 hover:glow-button"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  // Cart Component
  const CartSidebar = () => (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-gray-900 border-l border-gray-800 transform transition-transform duration-300 z-50 ${
        showCart ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 border-b border-gray-800">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-red-500">YOUR ORDER</h3>
          <button
            onClick={() => setShowCart(false)}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {cart.length === 0 ? (
          <p className="text-gray-400 text-center">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-white">{item.name}</h4>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    ×
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-700 text-white w-8 h-8 rounded-lg"
                    >
                      -
                    </button>
                    <span className="text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-700 text-white w-8 h-8 rounded-lg"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-white glow-red">
                    R{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-6 border-t border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-white">Total:</span>
            <span className="text-2xl font-bold text-red-500">
              R{getTotalPrice()}
            </span>
          </div>
          <button
            onClick={() => setShowCheckout(true)}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-all duration-300 hover:glow-button"
          >
            CHECKOUT
          </button>
        </div>
      )}
    </div>
  );

  // Navigation
  const Navigation = () => (
    <nav className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-b border-gray-800 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div
            onClick={() => setCurrentPage("home")}
            className="text-2xl md:text-4xl font-black text-white glow-red cursor-pointer"
            style={{ textShadow: "0 0 16px #ef4444, 0 0 32px #ef4444, 0 0 48px #ef4444" }}
          >
            HUNGRY BUSTERS
          </div>
          <div className="hidden md:flex space-x-8">
            {["home", "menu", "about", "contact"].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`font-bold transition-colors duration-300 ${
                  currentPage === page
                    ? "text-red-500"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {page.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300"
          >
            CART ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
        </div>
      </div>
    </nav>
  );

  // Order Complete Modal
  const OrderCompleteModal = () =>
    orderComplete && (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-gray-900 rounded-lg p-8 text-center border border-red-500 glow-red">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold text-red-500 mb-4">
            ORDER CONFIRMED!
          </h3>
          <p className="text-gray-300">
            Your hunger has been marked for elimination.
          </p>
          <p className="text-gray-300">Estimated delivery: 30-45 minutes</p>
        </div>
      </div>
    );

  // Checkout Modal
  const CheckoutModal = () =>
    showCheckout && (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-gray-900 rounded-lg p-8 w-full max-w-lg border border-gray-800 relative">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
            onClick={() => setShowCheckout(false)}
          >
            ×
          </button>
          {paymentSuccess ? (
            <div className="text-center">
              <h2 className="text-3xl font-black text-green-400 mb-4">Payment Successful!</h2>
              <p className="text-lg text-white mb-8">Thank you for your order. Your food is on its way!</p>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
                onClick={() => {
                  setPaymentSuccess(false);
                  setShowCheckout(false);
                  setOrderComplete(true);
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-red-500 text-white text-sm">
                <strong>Mock Payment Portal</strong><br />
                Please enter your card or banking details below. This is a mock payment and no real transaction will occur.
              </div>
              <form
                className="space-y-6"
                onSubmit={e => {
                  e.preventDefault();
                  setPaymentSuccess(true);
                  setCart([]);
                }}
              >
                <h2 className="text-2xl font-black text-white mb-6">Mock Payment Details</h2>
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                  required
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-1/2 p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-1/2 p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="border-t border-gray-700 my-4"></div>
                <input
                  type="text"
                  placeholder="Bank Name"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Account Number"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Account Holder"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Branch Code"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-all duration-300 hover:glow-button"
                >
                  Pay
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    );

  return (
    <div className="font-roboto">
      <Navigation />

      {currentPage === "home" && <HomePage />}
      {currentPage === "menu" && <MenuPage />}
      {currentPage === "about" && <AboutPage />}
      {currentPage === "contact" && <ContactPage />}

      <CartSidebar />
      <OrderCompleteModal />
      <CheckoutModal />

      {/* Overlay for cart */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowCart(false)}
        ></div>
      )}

      <style jsx global>{`
        .glow-red {
          text-shadow: 0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #ef4444;
        }
        
        .glow-button {
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
        }
        
        .shadow-red {
          box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default MainComponent;
