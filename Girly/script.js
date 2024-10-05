// Memuat catatan dari local storage saat halaman dimuat
window.onload = function() {
    const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    entries.forEach(entry => addEntryToDOM(entry.text, entry.category, entry.color));
}

// Fungsi untuk menambahkan catatan ke DOM
function addEntryToDOM(text, category, color) {
    const entryList = document.getElementById("entryList");
    const entryDiv = document.createElement("div");
    entryDiv.className = "entry";
    entryDiv.style.backgroundColor = color;

    entryDiv.innerHTML = `
        <strong>Kategori: ${category}</strong>
        <p>${text}</p>
        <div class="entry-actions">
            <button onclick="editEntry(this)">Edit</button>
            <button onclick="deleteEntry(this)">Hapus</button>
        </div>
    `;

    entryList.appendChild(entryDiv);
}

// Menyimpan catatan saat tombol diklik
document.getElementById("saveEntry").addEventListener("click", function() {
    const journalEntry = document.getElementById("journalEntry").value;
    const category = document.getElementById("category").value;
    const bgColor = document.getElementById("bgColor").value;

    if (journalEntry) {
        addEntryToDOM(journalEntry, category, bgColor);
        saveEntryToLocalStorage(journalEntry, category, bgColor);
        document.getElementById("journalEntry").value = '';
    } else {
        alert("Harap tulis sesuatu sebelum menyimpan!");
    }
});

// Menyimpan catatan ke local storage
function saveEntryToLocalStorage(text, category, color) {
    const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    entries.push({ text, category, color });
    localStorage.setItem("journalEntries", JSON.stringify(entries));
}

// Mengedit catatan
function editEntry(button) {
    const entryDiv = button.parentElement.parentElement;
    const text = entryDiv.querySelector('p').innerText;
    const category = entryDiv.querySelector('strong').innerText.split(': ')[1];
    const color = entryDiv.style.backgroundColor;

    document.getElementById("journalEntry").value = text;
    document.getElementById("category").value = category;
    document.getElementById("bgColor").value = color;

    entryDiv.remove(); // Hapus catatan yang sedang diedit
}

// Menghapus catatan
function deleteEntry(button) {
    const entryDiv = button.parentElement.parentElement;
    entryDiv.remove(); // Hapus catatan dari DOM
}
