// File: dashboard.js
class MobileDashboard extends HTMLElement {
    connectedCallback() {
        const activePage = this.getAttribute('active') || 'dashboard';

        this.innerHTML = `
            <style>
                /* Reset dasar agar pas di layar HP */
                body {
                    margin: 0;
                    padding-bottom: 70px; /* Jarak agar konten tidak tertutup menu bawah */
                    background-color: #f8fafc;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    color: #1e293b;
                }

                /* Header Aplikasi Atas (App Bar) */
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

                /* Navigasi Bawah ala APK (Bottom Navigation) */
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
                .nav-item.active {
                    color: #0284c7; /* Warna biru aktif */
                }
                
                /* Pengaturan Layout Konten Umum di HP */
                .container {
                    padding: 16px;
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

            <!-- Header Atas -->
            <div class="app-header">
                <div class="brand">GudangMobile v1.0</div>
                <div class="status-badge">Firebase Online</div>
            </div>

            <!-- Menu Tab Bawah ala APK -->
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
customElements.define('mobile-dashboard', MobileDashboard);
// Fungsi universal untuk mencatat aktivitas dari menu mana pun
window.catatAktivitas = function(tipe, pesan) {
    // 1. Ambil riwayat lama dari penyimpanan browser (atau bisa diganti Firebase nanti)
    let riwayat = JSON.parse(localStorage.getItem('log_gudang')) || [];
    
    // 2. Ambil waktu saat ini (WIB)
    const sekarang = new Date();
    const jam = sekarang.getHours().toString().padStart(2, '0');
    const menit = ...sekarang.getMinutes().toString().padStart(2, '0');
    const waktuStr = `${jam}:${menit} WIB`;

    // 3. Masukkan data riwayat baru ke baris paling atas
    riwayat.unshift({ tipe: tipe, pesan: pesan, waktu: waktuStr });
    
    // 4. Batasi maksimal 20 riwayat saja agar memori HP tidak penuh
    if (riwayat.length > 20) riwayat.pop();
    
    // 5. Simpan kembali
    localStorage.setItem('log_gudang', JSON.stringify(riwayat));
};
