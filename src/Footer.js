import React from 'react';

/**
 * Footer 組件：專門處理網頁底部的作者資訊與社群連結
 * 這樣以後修改設計，只要動這個檔案就好！
 */
function Footer() {
  const styles = {
    footerContainer: { padding: '0 60px 40px', marginTop: '60px' },
    footerCard: { 
      backgroundColor: 'white', 
      borderRadius: '30px', 
      padding: '30px 40px', 
      border: '1px solid #F2EEE9', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      boxShadow: '0 10px 40px rgba(78,52,46,0.03)' 
    },
    discordBtn: { 
      backgroundColor: '#5865F2', 
      color: 'white', 
      padding: '10px 22px', 
      borderRadius: '16px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px', 
      fontSize: '14px', 
      fontWeight: '800', 
      textDecoration: 'none', 
      boxShadow: '0 6px 20px rgba(88,101,242,0.3)' 
    },
    instagramBtn: { 
      backgroundColor: 'white', 
      color: '#4E342E', 
      padding: '10px 22px', 
      borderRadius: '16px', 
      border: '1px solid #F0EAE2', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px', 
      fontSize: '14px', 
      fontWeight: '800', 
      textDecoration: 'none' 
    },
    versionPill: { 
      backgroundColor: '#F5F0E9', 
      color: '#8D6E63', 
      padding: '8px 20px', 
      borderRadius: '20px', 
      fontSize: '12px', 
      fontWeight: '800' 
    }
  };

  return (
    <div style={styles.footerContainer}>
      <div style={styles.footerCard}>
        {/* 左側：作者資訊 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ backgroundColor: '#FDF8F3', padding: '15px', borderRadius: '18px', border: '1px solid #F2EEE9', fontSize: '24px' }}>☕</div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '800', color: '#BCB0A1', letterSpacing: '1px' }}>DEVELOPED BY</div>
            <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#4E342E', margin: 0 }}>Vincent</h2>
          </div>
        </div>

        {/* 中間：專案描述 */}
        <div style={{ flex: 1, marginLeft: '50px' }}>
          <div style={{ fontSize: '14px', color: '#4E342E', fontWeight: '700' }}>專為 Artale 市場套利打造的決策工具</div>
          <div style={{ fontSize: '12px', color: '#BCB0A1', marginTop: '4px', fontWeight: '600' }}>祝各位套利順利、楓幣滾滾來！🍁</div>
        </div>

        {/* 右側：社群連結與版本號 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={styles.discordBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
            <span>24_vincent</span>
          </div>
          <a href="https://www.instagram.com/24.vincent" target="_blank" rel="noreferrer" style={styles.instagramBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            <span>Follow Me</span>
          </a>
          <div style={styles.versionPill}>v1.0.0 Build 20260415</div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '25px', color: '#BCB0A1', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px' }}>
        © 2026 ARTALE ARBITRAGE HUB. ALL RIGHTS RESERVED.
      </div>
    </div>
  );
}

export default Footer;