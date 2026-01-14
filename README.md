Here is the complete `README.md` code block. You can copy this directly into your file.

```markdown
# 📢 Awaz - Student Grievance & Community Platform

**Awaz** is a comprehensive full-stack web application designed to bridge the gap between students and administration. It allows students to voice their concerns, track complaints, and interact with a supportive AI chatbot, while providing administrators with tools to manage and resolve issues efficiently.

## 🚀 Project Architecture

The project is divided into four distinct modules:

* **📱 Client (`/Awaz`)**: The student-facing React frontend for posting complaints and tracking activity.
* **🛡️ Admin (`/awaz-admin`)**: A separate React frontend for administrators to view dashboards and manage complaints.
* **⚙️ Server (`/Server`)**: A Node.js & Express backend handling authentication, database operations, and file uploads.
* **🤖 AI Service (`/ai`)**: A Python/Flask microservice utilizing the Perplexity API (`sonar-pro`) to provide supportive chat assistance.

---

## 🛠️ Tech Stack

### **Frontend (Client & Admin)**
* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **Icons:** Lucide React

### **Backend**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (JSON Web Tokens) & bcryptjs
* **Storage:** Cloudinary (via Multer)

### **AI Service**
* **Language:** Python
* **Framework:** Flask
* **Model:** Perplexity API (Sonar Pro)

---

## ⚙️ Installation & Setup

Prerequisites: Node.js, Python, and MongoDB installed locally or a cloud URI.

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/awaz.git](https://github.com/yourusername/awaz.git)
cd awaz

```

### 2. Backend Setup (Node.js)

```bash
cd Server
npm install

```

* Create a `.env` file in the `Server` directory:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```


* Start the server:
```bash
npm start

```



### 3. Student Frontend Setup

```bash
cd ../Awaz
npm install
npm run dev

```

* Runs on `http://localhost:5173`

### 4. Admin Frontend Setup

```bash
cd ../awaz-admin
npm install
npm run dev

```

* Runs on `http://localhost:5174` (Ensure CORS in server allows this port)

### 5. AI Service Setup (Python)

```bash
cd ../ai
pip install flask requests flask-cors

```

* Create a `.env` file or export the variable (depending on OS):
```bash
export PERPLEXITY_API_KEY=your_perplexity_api_key

```


* Start the Flask server:
```bash
python server.py

```


* Runs on `http://localhost:5000`

---

## 🌟 Key Features

### For Students

* **Secure Authentication:** Login and signup to access the dashboard.
* **Create Posts/Complaints:** Easy-to-use forms for submitting grievances.
* **Real-time Chat:** Interactive chat interface for discussing issues.
* **Activity Tracking:** "My Activity" page to track the status of submitted complaints.
* **AI Support:** Built-in AI chatbot trained to be supportive and encouraging.

### For Admins

* **Dedicated Dashboard:** Overview of all complaints and system stats.
* **Complaint Management:** View detailed complaint information and manage resolutions.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request for any feature enhancements or bug fixes.

## 📄 License

This project is licensed under the ISC License.

```

```
