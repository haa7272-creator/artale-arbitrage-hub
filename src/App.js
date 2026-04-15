import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Footer from './Footer'; // 引入我們剛寫好的小盒子
import Header from './Header'; // 引入 Header 組件

function App() {
  // 1. 道具與成本配置
  const itemConfig = [
    { key: 'sp', name: 'SP初始化卷軸', bestWcPerUnit: 600 / 2 },
    { key: 'ap', name: 'AP初始化卷軸', bestWcPerUnit: 800 / 2 },
    { key: 'backpack', name: '神秘背包', bestWcPerUnit: 250 / 1 },
    { key: 'charm', name: '護身符咒', bestWcPerUnit: 4500 / 110 },
    { key: 'megaphone', name: '高效能喇叭', bestWcPerUnit: 1200 / 11 },
    { key: 'megaphone_up', name: '高效能喇叭UP', bestWcPerUnit: 1400 / 11 },
    { key: 'teleport_stone', name: '高級瞬移之石', bestWcPerUnit: 4000 / 110 },
    { key: 'flower_rain', name: '漫天花雨', bestWcPerUnit: 3000 / 110 },
    { key: 'snowflake', name: '飄雪結晶', bestWcPerUnit: 3000 / 110 },
    { key: 'raid_ticket', name: '突襲額外獎勵票券', bestWcPerUnit: 1200 / 7 },
  ];

  const [prices, setPrices] = useState(itemConfig.reduce((acc, item) => ({ ...acc, [item.key]: '' }), {}));
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [isHovered, setIsHovered] = useState(null);
  // 記錄目前的登入使用者資料
  const [user, setUser] = useState(null);

  // 當網頁一打開，立刻檢查玩家是否已經登入過
  useEffect(() => {
    // 取得目前的 session
    const session = supabase.auth.getSession();
    setUser(session?.user ?? null);

    // --- 新增這行：網頁打開時先抓一次數據 ---
    fetchLatestPrices();

    // 監聽登入/登出狀態的變化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleChange = (e) => {
    setPrices({ ...prices, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- 新增：如果沒登入，直接擋掉並彈出提示 ---
    if (!user) {
      showToast('⚠️ 請先登入 Discord 才能同步數據', 'error');
      return;
    }

    showToast('⏳ 正在同步數據...', 'loading');
    const { error } = await supabase.from('market_prices').insert([
      itemConfig.reduce((acc, item) => ({
        ...acc,
        [`${item.key}_price`]: parseFloat(prices[item.key]) || null,
      }), {}),
    ]);
    if (error) {
      showToast(`❌ 同步失敗: ${error.message}`, 'error');
    } else {
      showToast('✅ 數據同步成功！', 'success');
      // 成功後重新抓取，確保顯示的是資料庫裡的數據
      fetchLatestPrices();
    }
  };

  // 從 Supabase 抓取最後一筆價格數據
  const fetchLatestPrices = async () => {
    // 抓取 market_prices 資料表，依照時間排序取最新的一筆
    const { data, error } = await supabase
      .from('market_prices')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('讀取數據失敗:', error.message);
      return;
    }

    if (data) {
      // 將資料庫的欄位轉換回我們 input 使用的格式
      const newPrices = {};
      itemConfig.forEach(item => {
        newPrices[item.key] = data[`${item.key}_price`] || '';
      });
      setPrices(newPrices);
    }
  };

  // 觸發 Discord 登入的函數
  const handleDiscordLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) showToast(`❌ 登入失敗: ${error.message}`, 'error');
  };

  const results = itemConfig
    .map((item) => {
      const marketPriceW = parseFloat(prices[item.key]);
      if (!marketPriceW) return null;
      const costTwd = item.bestWcPerUnit * 0.15;
      const roi = (marketPriceW * 10000) / costTwd;
      return { ...item, roi, marketPriceW };
    })
    .filter((res) => res !== null)
    .sort((a, b) => b.roi - a.roi);

  // --- 所有樣式定義 ---
  const styles = {
    container: { backgroundColor: '#FFFDF9', minHeight: '100vh', color: '#4E342E', fontFamily: '"Inter", sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', padding: '20px 60px', backgroundColor: 'white', borderBottom: '1px solid #F2EEE9', alignItems: 'center' },
    logoIcon: { backgroundColor: '#935E39', padding: '12px', borderRadius: '15px', color: 'white', fontSize: '20px', boxShadow: '0 4px 12px rgba(147,94,57,0.3)' },
    main: { display: 'grid', gridTemplateColumns: '340px 1fr', gap: '40px', padding: '40px 60px' },
    card: { backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(78,52,46,0.04)', border: '1px solid #F2EEE9' },
    inputField: { width: '100%', padding: '14px', marginTop: '8px', borderRadius: '14px', border: '1.5px solid #F0EAE2', backgroundColor: '#FCFAF8', fontSize: '14px', outline: 'none' },
    syncBtn: { width: '100%', backgroundColor: '#D35400', color: 'white', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '25px', boxShadow: '0 6px 20px rgba(211,84,0,0.25)', transition: 'all 0.2s' },
    toast: { position: 'fixed', top: '30px', left: '50%', transform: 'translateX(-50%)', padding: '12px 24px', borderRadius: '12px', color: 'white', fontWeight: 'bold', zIndex: 1000, backgroundColor: toast.type === 'error' ? '#E74C3C' : toast.type === 'loading' ? '#F39C12' : '#27AE60', display: toast.show ? 'block' : 'none' },
    // Footer 專用樣式
    footerContainer: { padding: '0 60px 40px', marginTop: '60px' },
    footerCard: { backgroundColor: 'white', borderRadius: '30px', padding: '30px 40px', border: '1px solid #F2EEE9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 10px 40px rgba(78,52,46,0.03)' },
    discordBtn: { backgroundColor: '#5865F2', color: 'white', padding: '10px 22px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: '800', textDecoration: 'none', boxShadow: '0 6px 20px rgba(88,101,242,0.3)' },
    instagramBtn: { backgroundColor: 'white', color: '#4E342E', padding: '10px 22px', borderRadius: '16px', border: '1px solid #F0EAE2', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: '800', textDecoration: 'none' },
    versionPill: { backgroundColor: '#F5F0E9', color: '#8D6E63', padding: '8px 20px', borderRadius: '20px', fontSize: '12px', fontWeight: '800' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.toast}>{toast.message}</div>

      <Header
        user={user}
        onLogin={handleDiscordLogin}
        onLogout={async () => {
          await supabase.auth.signOut();
          showToast('👋 已安全登出系統', 'success');
        }}
      />

      <main style={styles.main}>
        <aside>
          <div style={styles.card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '25px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#D35400' }}></div>
              <h3 style={{ fontSize: '12px', color: '#8D6E63', margin: 0, letterSpacing: '1px' }}>市場行情回報</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '10px' }}>
                {itemConfig.map((item) => (
                  <div key={item.key} style={{ marginBottom: '18px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#BCB0A1' }}>{item.name}</label>
                    <input type="number" step="0.1" name={item.key} value={prices[item.key]} onChange={handleChange} placeholder="輸入萬楓幣..." style={styles.inputField} />
                  </div>
                ))}
              </div>
              <button
                type="submit"
                disabled={!user} // 當沒登入時，讓按鈕點不動
                style={{
                  ...styles.syncBtn,
                  // 如果有登入就用原本顏色，沒登入就變灰色 (#BCB0A1)
                  backgroundColor: user ? '#D35400' : '#BCB0A1',
                  cursor: user ? 'pointer' : 'not-allowed',
                  boxShadow: user ? styles.syncBtn.boxShadow : 'none',
                  opacity: user ? 1 : 0.8
                }}
              >
                {user ? 'SYNC DATA' : '🔒 請先登入 DISCORD'}
              </button>
            </form>
          </div>
        </aside>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={styles.card}>
            <h3 style={{ marginTop: 0, fontSize: '18px' }}>🏆 最佳效率排行 (ROI)</h3>
            {results.length > 0 ? results.map((res, index) => (
              <div key={res.key} style={{ padding: '18px 0', borderBottom: '1px solid #F5F0E9', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '700' }}><span style={{ color: index === 0 ? '#D35400' : '#BCB0A1', marginRight: '10px' }}>0{index + 1}</span>{res.name}</span>
                <span style={{ fontWeight: '800', color: index === 0 ? '#D35400' : '#4E342E' }}>{Math.round(res.roi).toLocaleString()} <small style={{ fontSize: '10px', color: '#BCB0A1' }}>楓幣/TWD</small></span>
              </div>
            )) : <div style={{ padding: '40px', textAlign: 'center', color: '#BCB0A1' }}>請在左側輸入價格...</div>}
          </div>

          <div style={styles.card}>
            <h3 style={{ marginTop: 0, fontSize: '18px' }}>📊 市場價格波動趨勢</h3>
            <div style={{ height: '300px', width: '100%', marginTop: '20px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ n: '04/13', p: 310 }, { n: '04/14', p: 325 }, { n: '04/15', p: 320 }]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F2EEE9" />
                  <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{ fill: '#BCB0A1', fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }} />
                  <Line type="monotone" dataKey="p" stroke="#D35400" strokeWidth={4} dot={{ r: 6, fill: '#D35400', stroke: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </main>

      {/* 使用模組化組件 */}
      <Footer />
    </div>
  );
}

export default App;