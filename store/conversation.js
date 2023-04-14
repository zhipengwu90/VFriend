//data from testing, no using in the app

const Conversation = [
  {
    userId: 1,
    name: "Grandpa",
    system: {
      role: "system",
      content: "assistant pretend to be a my grandpa, I want to talk to him",
    },
    message: "Hello there, how are you",
    imageUri:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg",
    Date: "2021-05-01",
    conversation: [
      {"role": "assistant", "content": "4"},
      {"role": "user", "content": "3"},
      {"role": "assistant", "content": "2"},
      {"role": "user", "content": "1"},
      {"role": "assistant", "content": "I am fine, how are you?"},
      {"role": "user", "content": "How are you?"},
      {"role": "assistant", "content": "Hi, I am assistant"},
      {"role":"user", "content": "Hi, I really miss you"},
    ],
  },
  {
    userId: 2,
    name: "Jeremy",
    system: {
      role: "system",
      content:
        "assistant pretend to be a my best friend Jeremy, I want to talk to him",
    },
    message: "Hello there, how are you",
    imageUri:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg",
    Date: "2021-05-01",
    conversation: [],
  },
  {
    userId: 3,
    name: "Jasper Wu",
    system: {
      role: "system",
      content:
        "assistant pretend to be a my son Jasper, you are 2 and half years old. I am his father, I want to talk to him",
    },
    message: "Hello there, how are you",
    imageUri:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg",
    Date: "2021-05-01",
    conversation: [],
  },  {
    userId: 4,
    name: "Milad",
    system: {
      role: "system",
      content:
        "assistant pretend to be my best friend, your name is Milad, I want to talk to him",
    },
    message: "Hello there, how are you",
    imageUri:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg",
    Date: "2021-05-01",
    conversation: [],
  },
];
export default Conversation;
