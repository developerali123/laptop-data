package main

import (
	"errors"
	"fmt"
	"time"
)

///////////////////////
// 1. STRUCTS & INTERFACES
///////////////////////

// User struct
type User struct {
	ID    int
	Name  string
	Email string
	Role  string
}

// Invoice struct
type Invoice struct {
	ID     int
	Amount float64
	UserID int
	Paid   bool
}

// Notifier interface (implemented by EmailNotifier)
type Notifier interface {
	Notify(user User, message string) error
}

// EmailNotifier struct
type EmailNotifier struct{}

func (e EmailNotifier) Notify(user User, message string) error {
	// simulate failure if email is empty
	if user.Email == "" {
		return errors.New("user email not found")
	}
	fmt.Printf("📧 Email to %s: %s\n", user.Email, message)
	return nil
}

///////////////////////
// 2. ERROR HANDLING
///////////////////////

// Custom error
var ErrInvalidInvoice = errors.New("invalid invoice")

func validateInvoice(inv Invoice) error {
	if inv.Amount <= 0 {
		return fmt.Errorf("invoice %d: %w", inv.ID, ErrInvalidInvoice)
	}
	return nil
}

///////////////////////
// 3. CONCURRENCY
///////////////////////

// processInvoices concurrently with goroutines
func processInvoices(invoices []Invoice, users map[int]User, notifier Notifier) {
	ch := make(chan string)

	// worker goroutine
	go func() {
		for msg := range ch {
			fmt.Println("✅ Processed:", msg)
		}
	}()

	for _, inv := range invoices {
		// goroutine per invoice
		go func(inv Invoice) {
			user := users[inv.UserID]

			// validate invoice
			if err := validateInvoice(inv); err != nil {
				ch <- fmt.Sprintf("❌ Error for invoice %d: %v", inv.ID, err)
				return
			}

			// notify user
			err := notifier.Notify(user, fmt.Sprintf("Invoice #%d of $%.2f processed", inv.ID, inv.Amount))
			if err != nil {
				ch <- fmt.Sprintf("⚠️ Notification failed: %v", err)
				return
			}

			ch <- fmt.Sprintf("Invoice #%d done for %s", inv.ID, user.Name)
		}(inv)
	}

	// wait for goroutines (demo purpose only)
	time.Sleep(2 * time.Second)
	close(ch)
}

func fetchAPI(apiName string, delay time.Duration, ch chan string) {
	time.Sleep(delay) // simulate time taken by API
	ch <- fmt.Sprintf("%s finished in %v", apiName, delay)
}

///////////////////////
// 4. MAIN FUNCTION
///////////////////////
func main() {
	// VARIABLES
	var systemName string = "Mini Invoice System"
	fmt.Println("🚀 Starting:", systemName)

	// ARRAY
	ids := [3]int{101, 102, 103}
	fmt.Println("Array of IDs:", ids)

	// SLICE
	users := []User{
		{ID: 1, Name: "Ali", Email: "ali@example.com", Role: "Admin"},
		{ID: 2, Name: "Sara", Email: "sara@example.com", Role: "User"},
		{ID: 3, Name: "John", Email: "", Role: "User"}, // No email
	}
	fmt.Println("Slice of Users:", users)

	// MAP
	userMap := make(map[int]User)
	for _, u := range users {
		userMap[u.ID] = u
	}

	// LOOP & CONDITIONS
	for _, u := range users {
		if u.Role == "Admin" {
			fmt.Println("👑 Admin found:", u.Name)
		} else {
			fmt.Println("👤 Regular user:", u.Name)
		}
	}

	// SWITCH
	for _, u := range users {
		switch u.Role {
		case "Admin":
			fmt.Println(u.Name, "can manage invoices")
		case "User":
			fmt.Println(u.Name, "can only view invoices")
		default:
			fmt.Println(u.Name, "has unknown role")
		}
	}

	// INVOICES (slice)
	invoices := []Invoice{
		{ID: 1, Amount: 200.50, UserID: 1, Paid: true},
		{ID: 2, Amount: -50, UserID: 2, Paid: false},  // Invalid
		{ID: 3, Amount: 120, UserID: 3, Paid: true},   // No email
	}

	// PROCESS INVOICES CONCURRENTLY
	notifier := EmailNotifier{}
	processInvoices(invoices, userMap, notifier)

	fmt.Println("🏁 System finished")

	// Create a channel for communication
	ch := make(chan string)

	// Start goroutines (concurrent API calls)
	go fetchAPI("API-1", 3*time.Second, ch)
	go fetchAPI("API-2", 1*time.Second, ch)
	go fetchAPI("API-3", 2*time.Second, ch)

	// Collect results from channel
	for i := 0; i < 3; i++ {
		result := <-ch
		fmt.Println("✅", result)
	}

	fmt.Println("🏁 All APIs finished")

}