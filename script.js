const API_KEY = "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";
const API_URL = "https://openrouter.ai/api/v1/images/generations";

const btn = document.getElementById("generateBtn");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");

btn.addEventListener("click", generateImages);

async function generateImages() {
  const prompt = document.getElementById("prompt").value;
  if (!prompt) {
    alert("اكتب وصف للصورة");
    return;
  }

  img1.src = img2.src = img3.src = "";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "stabilityai/stable-diffusion-xl-base-1.0",
        prompt: prompt,
        n: 3,
        size: "512x512"
      })
    });

    const data = await res.json();

    img1.src = data.data[0].url;
    img2.src = data.data[1].url;
    img3.src = data.data[2].url;

  } catch (error) {
    console.error(error);
    alert("صار خطأ أثناء توليد الصور");
  }
}
