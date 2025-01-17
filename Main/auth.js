// Firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { auth, db } from './firebase.js';

// Sign Up
const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    // Validation
    if (!email || !password) {
        alert("Please enter a valid email and password.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert("User signed up successfully!");
        console.log("User:", userCredential.user);
    } catch (error) {
        alert("Sign-up failed: " + error.message);
        console.error("Error signing up:", error.message);
    }
});

// Log In
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validation
    if (!email || !password) {
        alert("Please enter a valid email and password.");
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        console.log("User:", userCredential.user);
    } catch (error) {
        alert("Login failed: " + error.message);
        console.error("Error logging in:", error.message);
    }
});

// Add Expense
const expenseForm = document.getElementById("expense-form");
expenseForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;

    // Validation
    if (isNaN(amount) || !date || !category) {
        alert("Please fill in all the required fields.");
        return;
    }

    try {
        await addDoc(collection(db, "expenses"), {
            amount,
            category,
            date,
            description: description || "N/A"
        });
        alert("Expense added successfully!");
        expenseForm.reset();
    } catch (error) {
        alert("Error adding expense: " + error.message);
        console.error("Error adding expense:", error.message);
    }
});

// Fetch Expenses
const fetchExpenses = async () => {
    const tableBody = document.querySelector("#expenses-list tbody");
    tableBody.innerHTML = ""; // Clear table before fetching

    try {
        const querySnapshot = await getDocs(collection(db, "expenses"));
        querySnapshot.forEach((doc) => {
            const { date, category, amount, description } = doc.data();
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${date}</td>
                <td>${category}</td>
                <td>$${amount.toFixed(2)}</td>
                <td>${description || "N/A"}</td>
            `;
            tableBody.appendChild(newRow);
        });
    } catch (error) {
        alert("Error fetching expenses: " + error.message);
        console.error("Error fetching expenses:", error.message);
    }
};

fetchExpenses();
