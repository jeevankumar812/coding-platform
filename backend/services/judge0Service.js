import axios from "axios";

const languageMap = {
  cpp: 54,      // C++ (GCC 9.2.0)
  java: 62,     // Java (OpenJDK 13)
  python: 71,   // Python 3
};

export const runCode = async (language, code, input = "") => {
  try {
    const languageId = languageMap[language];

    if (!languageId) {
      throw new Error("Unsupported language");
    }

    const response = await axios.post(
      `${process.env.JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
      {
        source_code: code,
        language_id: languageId,
        stdin: input,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);

    throw new Error(
      error.response?.data?.message ||
      error.message ||
      "Judge0 Execution Failed"
    );
  }
};