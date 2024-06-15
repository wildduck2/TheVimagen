// User class
class User {
private String userId;
private String username;
private String password;
// Other attributes and methods

    public User(String userId, String username, String password) {
        this.userId = userId;
        this.username = username;
        this.password = password;
    }

    // Getters and setters
    // Other user-related methods

}

// Email class
class Email {
private String emailId;
private User sender;
private List<User> receivers;
private String subject;
private String body;
private LocalDateTime timestamp;
private boolean isRead;
private List<String> labels;
private List<String> attachments;
// Other attributes and methods

    public Email(String emailId, User sender, List<User> receivers, String subject, String body) {
        this.emailId = emailId;
        this.sender = sender;
        this.receivers = receivers;
        this.subject = subject;
        this.body = body;
        this.timestamp = LocalDateTime.now();
        this.isRead = false;
        this.labels = new ArrayList<>();
        this.attachments = new ArrayList<>();
    }

    // Getters and setters
    // Methods for adding and removing receivers, labels, and attachments

}

// EmailManager class
class EmailManager {
private List<Email> inbox;
private List<Email> sent;
private List<Email> drafts;
private List<Email> trash;
// Other attributes and methods

    public EmailManager() {
        this.inbox = new ArrayList<>();
        this.sent = new ArrayList<>();
        this.drafts = new ArrayList<>();
        this.trash = new ArrayList<>();
    }

    public void sendEmail(Email email) {
        // Send the email and add it to the sent folder
        sent.add(email);
    }

    public void receiveEmail(Email email) {
        inbox.add(email);
        // Notify observers about new received email
    }

    public void moveEmailToTrash(Email email) {
        inbox.remove(email);
        drafts.remove(email);
        sent.remove(email);
        trash.add(email);
    }

    public List<Email> getInbox() {
        return inbox;
    }

    // Other email management methods

}

// EmailSearchStrategy interface (Strategy)
interface EmailSearchStrategy {
List<Email> searchEmails(List<Email> emails, String keyword);
}

// KeywordSearchStrategy class (Strategy)
class KeywordSearchStrategy implements EmailSearchStrategy {
@Override
public List<Email> searchEmails(List<Email> emails, String keyword) {
return emails.stream()
.filter(email -> email.getSubject().contains(keyword) || email.getBody().contains(keyword))
.collect(Collectors.toList());
}
}

// SenderSearchStrategy class (Strategy)
class SenderSearchStrategy implements EmailSearchStrategy {
@Override
public List<Email> searchEmails(List<Email> emails, String sender) {
return emails.stream()
.filter(email -> email.getSender().getUsername().equals(sender))
.collect(Collectors.toList());
}
}

// SearchManager class
class SearchManager {
private EmailSearchStrategy searchStrategy;

    public void setSearchStrategy(EmailSearchStrategy searchStrategy) {
        this.searchStrategy = searchStrategy;
    }

    public List<Email> searchEmails(List<Email> emails, String keyword) {
        return searchStrategy.searchEmails(emails, keyword);
    }

}

// PresenceObserver interface
interface PresenceObserver {
void onPresenceChange(User user, boolean online);
}

// PresenceManager class (Singleton)
class PresenceManager {
private static PresenceManager instance;
private Map<User, Boolean> presenceMap;
private List<PresenceObserver> observers;

    private PresenceManager() {
        this.presenceMap = new HashMap<>();
        this.observers = new ArrayList<>();
    }

    public static synchronized PresenceManager getInstance() {
        if (instance == null) {
            instance = new PresenceManager();
        }
        return instance;
    }

    public void setPresence(User user, boolean online) {
        presenceMap.put(user, online);
        notifyObservers(user, online);
    }

    public void addObserver(PresenceObserver observer) {
        observers.add(observer);
    }

    public void removeObserver(PresenceObserver observer) {
        observers.remove(observer);
    }

    private void notifyObservers(User user, boolean online) {
        for (PresenceObserver observer : observers) {
            observer.onPresenceChange(user, online);
        }
    }

}

// EmailNotificationObserver class (Observer)
class EmailNotificationObserver implements PresenceObserver {
private User user;

    public EmailNotificationObserver(User user) {
        this.user = user;
    }

    @Override
    public void onPresenceChange(User user, boolean online) {
        // Notify the user about new emails when they come online
        if (user.equals(this.user) && online) {
            // Check for new emails and display notifications
        }
    }

}

// EmailLabelsDecorator class (Decorator)
class EmailLabelsDecorator extends Email {
private Email email;

    public EmailLabelsDecorator(Email email) {
        super(email.getEmailId(), email.getSender(), email.getReceivers(), email.getSubject(), email.getBody());
        this.email = email;
    }

    @Override
    public List<String> getLabels() {
        List<String> labels = new ArrayList<>(email.getLabels());
        labels.add("Important");
        return labels;
    }

}

// EmailState interface (State)
interface EmailState {
void handleEmail(Email email);
}

// DraftState class (State)
class DraftState implements EmailState {
@Override
public void handleEmail(Email email) {
// Handle email actions in draft state (e.g., saving drafts, editing)
}
}

// SentState class (State)
class SentState implements EmailState {
@Override
public void handleEmail(Email email) {
// Handle email actions in sent state (e.g., marking as sent, archiving)
}
}

// InboxState class (State)
class InboxState implements EmailState {
@Override
public void handleEmail(Email email) {
// Handle email actions in inbox state (e.g., marking as read, replying)
}
}

// EmailStateContext class
class EmailStateContext {
private EmailState currentState;

    public EmailStateContext() {
        this.currentState = new DraftState();
    }

    public void setState(EmailState state) {
        this.currentState = state;
    }

    public void handleEmail(Email email) {
        currentState.handleEmail(email);
    }

}

// Main Class
public class GmailApp {
public static void main(String[] args) {
// Create users
User user1 = new User("user1", "john.doe@gmail.com", "password1");
User user2 = new User("user2", "alice.smith@gmail.com", "password2");

        // Create email objects
        Email email1 = new Email("email1", user1, List.of(user2), "Hello", "Hi Alice, how are you?");
        Email email2 = new Email("email2", user2, List.of(user1), "Re: Hello", "Hi John, I'm doing well.");

        // Create email manager
        EmailManager emailManager = new EmailManager();

        // Receive emails
        emailManager.receiveEmail(email1);
        emailManager.receiveEmail(email2);

        // Move an email to trash
        emailManager.moveEmailToTrash(email1);

        // Search emails
        SearchManager searchManager = new SearchManager();
        searchManager.setSearchStrategy(new KeywordSearchStrategy());
        List<Email> searchResults = searchManager.searchEmails(emailManager.getInbox(), "John");

        // Add labels to emails using decorators
        Email emailWithLabel = new EmailLabelsDecorator(email2);
        emailWithLabel.getLabels(); // Returns ["Important"]

        // Set email state and handle actions
        EmailStateContext stateContext = new EmailStateContext();
        stateContext.setState(new InboxState());
        stateContext.handleEmail(email2);
    }

}
