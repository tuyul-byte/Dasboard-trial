// File: dashboard.js
// Otak navigasi bawah universal untuk 3 menu utama

class MobileDashboard extends HTMLElement {
    connectedCallback() {
        // Mendeteksi halaman mana yang sedang aktif berdasarkan atribut tag HTML
        const activePage = this.getAttribute('active') || 'dashboard';

        this.innerHTML = `
            <style>
                /* RESET DASAR MOBILE */
                body {
                    margin: 0;
                    padding-bottom: 75px; /* Jarak bawah agar konten tidak tertutup menu tab */
                    background-color: #f8fafc;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    color: #1e293b;
                }

                /* HEADER APLIKASI (APP BAR ATAS) */
                .app-header {
                    background: #1e293b;
                    color: white;
                    padding: 16px 20px;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .app-header .brand {
                    font-size: 18px;
                    font-weight: 700;
                    color: #38bdf8;
                }
                .app-header .status-badge {
                    background: #10b981;
                    font-size: 11px;
                    padding: 4px 8px;
                    border-radius: 20px;
                    font-weight: 600;
                }

                /* NAVIGASI BAWAH ALA APK (BOTTOM NAVIGATION BAR) */
                .bottom-nav {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 65px;
                    background: #ffffff;
                    border-top: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    z-index: 1000;
                    box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
                }
                .nav-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: #94a3b8;
                    text-decoration: none;
                    font-size: 11px;
                    font-weight: 500;
                    width: 33.33%;
                    height: 100%;
                    transition: background 0.2s;
                }
                .nav-item .icon {
                    font-size: 20px;
                    margin-bottom: 3px;
                }
                
                /* EFEK WARNA BIRU JIKA MENU DIPILIH/AKTIF */
                .nav-item.active {
                    color: #0284c7; 
                    font-weight: 600;
                }
                
                /* LAYOUT WADAH KONTEN DI HP */
                .container {
                    padding: 16px;
                    box-sizing: border-box;
                }
                .app-card {
                    background: #ffffff;
                    border-radius: 12px;
                    padding: 16px;
                    margin-bottom: 14px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                    border: 1px solid #f1f5f9;
                }
            </style>

            <!-- Menampilkan Header Atas -->
            <div class="app-header">
                <div class="brand">GudangMobile v1.0</div>
                <div class="status-badge">Sistem Aktif</div>
            </div>

            <!-- MEMUNCULKAN 3 PILIHAN MENU DI BAWAH LAYAR HP -->
            <div class="bottom-nav">
                <a href="index.html" class="nav-item ${activePage === 'dashboard' ? 'active' : ''}">
                    <span class="icon">📊</span>
                    <span>Ringkasan</span>
                </a>
                <a href="stok.html" class="nav-item ${activePage === 'stok' ? 'active' : ''}">
                    <span class="icon">📦</span>
                    <span>Stok</span>
                </a>
                <a href="sisa.html" class="nav-item ${activePage === 'sisa' ? 'active' : ''}">
                    <span class="icon">⚠️</span>
                    <span>Sisa/Kritis</span>
                </a>
            </div>
        `;
    }
}

// Mendaftarkan elemen baru bernama <mobile-dashboard> ke mesin browser
customElements.define('mobile-dashboard', MobileDashboard);

// FUNGSI GLOBAL LOG AKTIVITAS (LOGISTIK)
window.catatAktivitas = function(tipe, pesan) {
    let riwayat = JSON.parse(localStorage.getItem('log_gudang')) || [];
    
    const sekarang = new Date();
    const jam = sekarang.getHours().toString().padStart(2, '0');
    const menit = sekarang.getMinutes().toString().padStart(2, '0');
    const waktuStr = `${jam}:${menit} WIB`;

    riwayat.unshift({ tipe: tipe, pesan: pesan, waktu: waktuStr });
    
    if (riwayat.length > 20) riwayat.pop();
    
    localStorage.setItem('log_gudang', JSON.stringify(riwayat));
};
