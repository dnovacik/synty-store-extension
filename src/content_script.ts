chrome.runtime.onMessage.addListener(function (message) {
  if (message === "syncUAS") {
    const titles = document.querySelectorAll("._161YN._30Ec_");

    let names = Array.from(titles.values()).map((title) => {
      const name = title.textContent?.toLowerCase();
      if (!name) return "";
      return name.startsWith("polygon") || name.startsWith("simple")
        ? name
        : "";
    });
    names = names.filter((n) => (!n ? "" : n));

    const existing = JSON.parse(
      localStorage.getItem("uasAssets") || "[]"
    ) as string[];
    names = Array.from(new Set(existing.concat(names)));

    localStorage.setItem("uasAssets", JSON.stringify(names));
    console.log("Saved to LC");
  }
});
