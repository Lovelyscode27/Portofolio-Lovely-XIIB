import sqlite3

# Data pengalaman
experiences = [
    {
        "title": "3x3 UWIKA Sports day",
        "description": "Turnamen basket 3x3 yang diadakan oleh Universitas Widya Kartika Surabaya. Berpartisipasi sebagai atlet dan berhasil meraih pengalaman berharga dalam kompetisi tingkat universitas.",
        "image": "UWIKA.jpeg"
    },
    {
        "title": "FEAST 2024 (BEM FISIP UNAIR)",
        "description": "Festival tahunan yang diselenggarakan oleh BEM FISIP Universitas Airlangga, menampilkan berbagai lomba dan kegiatan sosial. Berperan aktif dalam kepanitiaan dan pengembangan acara.",
        "image": "FEAST.png"
    },
    {
        "title": "UPH X SAMATOR 3x3",
        "description": "Kompetisi basket 3x3 hasil kolaborasi antara Universitas Pelita Harapan dan Samator. Mengasah kemampuan teamwork dan sportivitas.",
        "image": "UPH.jpeg"
    },
    {
        "title": "Kejuaraan Taekwondo Piala Walikota",
        "description": "Ajang kejuaraan taekwondo tingkat kota yang memperebutkan Piala Walikota. Berhasil meraih prestasi dan memperluas jejaring atlet.",
        "image": "Walikota.jpeg"
    },
    {
        "title": "Kejuaraan Taekwondo Piala KONI",
        "description": "Kompetisi taekwondo yang diadakan oleh KONI, mempertemukan atlet-atlet terbaik dari berbagai daerah. Menambah pengalaman bertanding di level yang lebih tinggi.",
        "image": "KONI.jpeg"
    },
    {
        "title": "OlimpIT ARA 7.0 (ITS)",
        "description": "Kompetisi IT nasional yang diselenggarakan oleh ITS. Berpartisipasi dalam lomba pemrograman dan teknologi, memperluas wawasan di bidang IT.",
        "image": "OlimpIT.png"
    }
]

def seed_db():
    conn = sqlite3.connect('experiences.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS experiences (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            image TEXT NOT NULL
        )
    ''')
    c.execute('DELETE FROM experiences')
    for exp in experiences:
        c.execute('INSERT INTO experiences (title, description, image) VALUES (?, ?, ?)',
                  (exp["title"], exp["description"], exp["image"]))
    conn.commit()
    conn.close()

if __name__ == "__main__":
    seed_db()
