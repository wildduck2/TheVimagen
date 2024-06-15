## Features Required

### User Registration and Authentication

- Users should be able to create accounts, log in, and authenticate themselves to access their emails.

### Email Composing and Sending

- Users should be able to compose and send emails to other users.

### Email Inbox

- Users should have an inbox where they can receive and view their received emails.

### Email Read and Unread Status

- Emails should have read and unread status to track the user's interaction with each email.

### Email Labels and Categories

- Users should be able to categorize their emails using labels, such as "Personal," "Work," "Important," etc.

### Email Search

- Users should be able to search for specific emails based on keywords, sender, date, etc.

### Attachments

- Users should be able to attach files to their emails.

### Email Forwarding and Reply

- Users should be able to forward emails to other users or reply to received emails.

### Drafts

- Users should be able to save drafts of their composed emails for future editing and sending.

### Email Deletion and Trash

- Users should be able to delete emails, and deleted emails should be moved to the trash folder.

### Email Archiving

- Users should have the option to archive emails to declutter their inbox while preserving important emails.

## Design Patterns Involved or Used

### Model-View-Controller (MVC) Pattern

- The MVC pattern can be used to separate the application into three components: the model (data and business logic), the view (user interface), and the controller (handles user interactions and manages the flow of data).

### Observer Pattern

- The Observer pattern can be used to notify users about new emails and updates to email read/unread status.

### Factory Pattern

- The Factory pattern can be used to create different types of email objects based on user requests, such as sent emails, received emails, drafts, etc.

### Singleton Pattern

- The Singleton pattern can be used to ensure that only one instance of certain classes, such as the user authentication manager or the email manager, is created and shared across the application.

### Proxy Pattern

- The Proxy pattern can be used to handle communication between the application and the email server, providing a level of indirection and encapsulation for network operations.

### Command Pattern

- The Command pattern can be used to encapsulate and decouple actions, such as sending emails or deleting emails, from the specific objects or components that perform those actions.

### Publish-Subscribe Pattern

- The Publish-Subscribe pattern can be used to implement the email notification system, where users subscribe to their inbox to receive updates on new emails, and publishers send email updates to the subscribers.

### Decorator Pattern

- The Decorator pattern can be used to add additional features or behaviors to email objects, such as email labels and categories.

### Strategy Pattern

- The Strategy pattern can be used to implement different search algorithms for searching emails based on different criteria, such as keywords, sender, or date.

### State Pattern

- The State pattern can be used to manage the different states of email interactions, such as composing, reading, or deleting emails.
