document.addEventListener("DOMContentLoaded", function () {
    const messageList = document.getElementById("message-list");
    const messageSubject = document.getElementById("message-subject");
    const messageSender = document.getElementById("message-sender");
    const messageBody = document.getElementById("message-body");
    const messageAttachments = document.getElementById("message-attachments");

    const composeBtn = document.getElementById("compose-btn");
    const composeForm = document.getElementById("compose-message");
    const closeCompose = document.getElementById("close-compose");
    const saveDraftBtn = document.getElementById("save-draft");
    const sendMessageBtn = document.getElementById("send-message");

    const composeTo = document.getElementById("compose-to");
    const composeTitle = document.getElementById("compose-title");
    const composeBody = document.getElementById("compose-body");
    const composeFile = document.getElementById("compose-file");
    const errorMessage = document.getElementById("error-message");

    // Sample dataset
    const validUsernames = ["user123", "alice01", "john_doe", "markT", "emmaC"];

    let messages = {
        inbox: [{ subject: "Reminder", sender: "alice01", body: "Meeting at 3 PM.", attachments: [] }],
        sent: [],
        drafts: []
    };

    let editingDraftIndex = null;

    function loadMessages(folder) {
        messageList.innerHTML = "";
        messages[folder].forEach((msg, index) => {
            let li = document.createElement("li");
            li.innerHTML = `<b>${msg.sender}</b>: ${msg.subject}`;
            li.addEventListener("click", () => folder === "drafts" ? editDraft(index) : showMessage(folder, index));
            messageList.appendChild(li);
        });
    }

    function showMessage(folder, index) {
        let msg = messages[folder][index];
        messageSubject.textContent = msg.subject;
        messageSender.textContent = "From: " + msg.sender;
        messageBody.textContent = msg.body;
        messageAttachments.innerHTML = "";
    }

    function editDraft(index) {
        let draft = messages.drafts[index];
        composeTo.value = draft.to;
        composeTitle.value = draft.subject;
        composeBody.value = draft.body;
        composeFile.value = "";
        editingDraftIndex = index;
        composeForm.classList.remove("hidden");
    }

    function saveDraft() {
        if (editingDraftIndex !== null) {
            messages.drafts[editingDraftIndex] = {
                to: composeTo.value,
                subject: composeTitle.value,
                sender: "You",
                body: composeBody.value
            };
        } else {
            messages.drafts.push({
                to: composeTo.value,
                subject: composeTitle.value,
                sender: "You",
                body: composeBody.value
            });
        }
        resetComposeForm();
        loadMessages("drafts");
    }

    function sendMessage() {
        if (!validUsernames.includes(composeTo.value)) {
            errorMessage.textContent = "Error: Username does not exist!";
            return;
        }
        errorMessage.textContent = "";
    
        let now = new Date();
        let timeSent = now.toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    

        //Variable to use for sending the content.
        let messageToSend = {
            to: composeTo.value,
            subject: composeTitle.value,
            sender: "You",
            body: composeBody.value,
            timeSent: timeSent
        };
    
        // Store message in the 'sent' array
        messages.sent.push(messageToSend);
    
        // Log or prepare message for API request
        console.log("Message ready to be sent:", messageToSend);
    
    
        resetComposeForm();
        loadMessages("sent");
    }
    

    function resetComposeForm() {
        composeTo.value = "";
        composeTitle.value = "";
        composeBody.value = "";
        composeFile.value = "";
        errorMessage.textContent = "";
        composeForm.classList.add("hidden");
        editingDraftIndex = null;
    }

    document.querySelectorAll(".folders-sidebar li").forEach(li => {
        li.addEventListener("click", function () {
            document.querySelectorAll(".folders-sidebar li").forEach(l => l.classList.remove("active"));
            this.classList.add("active");
            loadMessages(this.dataset.folder);
        });
    });

    composeBtn.addEventListener("click", () => {
        editingDraftIndex = null;
        resetComposeForm();
        composeForm.classList.remove("hidden");
    });

    closeCompose.addEventListener("click", () => {
        saveDraft();
        composeForm.classList.add("hidden");
    });

    saveDraftBtn.addEventListener("click", saveDraft);
    sendMessageBtn.addEventListener("click", sendMessage);

    loadMessages("inbox");
});
