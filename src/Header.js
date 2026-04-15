import React from 'react';

function Header({ user, onLogin, onLogout }) {
  const styles = {
    header: { 
      display: 'flex', justifyContent: 'space-between', padding: '18px 60px', 
      backgroundColor: 'white', borderBottom: '1px solid #F2EEE9', alignItems: 'center'
    },
    logoSection: { display: 'flex', alignItems: 'center', gap: '16px' },
    // Logo 盒子，顏色加深一點更有份量
    logoIconBox: { 
      backgroundColor: '#724328', 
      padding: '11px', 
      borderRadius: '16px', 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 6px 15px rgba(114,67,40,0.25)' 
    },
    titleGroup: { display: 'flex', flexDirection: 'column', lineHeight: '1' },
    mainTitle: { display: 'flex', alignItems: 'baseline', gap: '6px' },
    // 使用 'Inter' 字體並強制極致粗體
    titlePart1: { 
      fontFamily: "'Inter', sans-serif", 
      fontSize: '20px', 
      fontWeight: '900', 
      color: '#4E342E', 
      margin: 0,
      letterSpacing: '-1px' // 讓字體更緊湊，看起來更粗
    },
    titlePart2: { 
      fontFamily: "'Inter', sans-serif", 
      fontSize: '20px', 
      fontWeight: '900', 
      color: '#D35400', 
      margin: 0,
      letterSpacing: '-1px'
    },
    subtitle: { 
      fontSize: '11px', 
      color: '#B5A492', 
      fontWeight: '800', 
      textTransform: 'uppercase', 
      letterSpacing: '2px', // 副標題拉開字距
      marginTop: '4px' 
    },
    // 右側玩家膠囊
    userPill: {
      backgroundColor: '#FDF8F3', 
      padding: '6px 6px 6px 18px', 
      borderRadius: '30px',
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px', 
      border: '1px solid #F2EEE9',
      boxShadow: '0 2px 8px rgba(78,52,46,0.03)'
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoSection}>
        <div style={styles.logoIconBox}>
          {/* 【專屬套利 Icon】：結合天平與上升趨勢 */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="M7 12l5-5 4 4 5-5" />
            <circle cx="7" cy="12" r="1" fill="white" />
            <circle cx="12" cy="7" r="1" fill="white" />
            <circle cx="16" cy="11" r="1" fill="white" />
          </svg>
        </div>
        <div style={styles.titleGroup}>
          <div style={styles.mainTitle}>
            <span style={styles.titlePart1}>ARTALE</span>
            <span style={styles.titlePart2}>ARBITRAGE HUB</span>
          </div>
          <div style={styles.subtitle}>Market Decision System</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {user ? (
          <>
            <div style={styles.userPill}>
              <span style={{ fontSize: '14px', fontWeight: '900', color: '#4E342E' }}>
                {user?.user_metadata?.full_name || '文森c'}
              </span>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', overflow: 'hidden', border: '2px solid white' }}>
                <img src={user?.user_metadata?.avatar_url} alt="avatar" style={{ width: '100%', height: '100%' }} />
              </div>
            </div>
            <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex' }} onClick={onLogout}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B5A492" strokeWidth="2.5">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </>
        ) : (
          <button 
             style={{ backgroundColor: '#5865F2', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 15px rgba(88,101,242,0.2)' }} 
             onClick={onLogin}
          >
            <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
            Login with Discord
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;