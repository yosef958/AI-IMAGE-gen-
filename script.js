const API_KEY = "YOUR_API_KEY";

async function generate() {
  const prompt = document.getElementById("prompt").value;
  if (!prompt) return alert("اكتب وصف الصورة");

  const boxes = document.querySelectorAll(".img-box img");

  boxes.forEach(img => img.src = "");

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:generateImages?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt,
          numberOfImages: 3
        })
      }
    );

    const data = await res.json();

    if (!data.images) {
      console.log(data);
      return alert("فشل التوليد");
    }

    data.images.forEach((img, i) => {
      boxes[i].src = `data:image/png;base64,${img.imageBytes}`;
    });

  } catch (e) {
    console.error(e);
    alert("مشكلة في الاتصال");
  }
}
