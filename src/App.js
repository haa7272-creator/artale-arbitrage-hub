import React, { useState, useEffect } from 'react';

const INITIAL_ITEMS = [
  { id: 'sp', name: 'SP (能力點卷軸)', wc: 50, price: 3200000 },
  { id: 'ap', name: 'AP (技能點卷軸)', wc: 50, price: 3100000 },
  { id: 'tele', name: '瞬移石', wc: 6, price: 380000 },
  { id: 'raid', name: '突擊卷', wc: 15, price: 850000 },
  { id: 'snow', name: '雪花', wc: 10, price: 450000 },
];

function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [goal, setGoal] = useState(5); 
  const [results, setResults] = useState([]);

  useEffect(() => {
    const calculated = items.map(item => ({
      ...item,
      roi: item.price / item.wc,
    })).sort((a, b) => b.roi - a.roi);
    setResults(calculated);
  }, [items]);

  const handlePriceChange = (id, newPrice) => {
    setItems(items.map(item => item.id === id ? { ...item, price: Number(newPrice) } : item));
  };

  const bestItem = results[0];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8 font-sans text-center">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-orange-600 flex items-center justify-center gap-2">
          🍁 Artale 楓幣套利決策中心
        </h1>
        <p className="text-slate-400 mt-2 text-sm italic">延用 Raid Hub 介面風格</p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 text-left">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-slate-700 pb-2">💰 市場現價</h2>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <span>{item.name}</span>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handlePriceChange(item.id, e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 w-32 text-right text-orange-400 outline-none"
                />
              </div>
            ))}
          </div>
          <div className="mt-10 pt-6 border-t border-slate-700">
            <h2 className="text-xl font-bold mb-4">🎯 目標金額 (億)</h2>
            <input
              type="number"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
              className="w-full bg-slate-900 border-2 border-orange-600/50 rounded-lg py-3 text-center text-3xl font-black text-orange-500 outline-none"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-orange-600 rounded-xl p-6 shadow-2xl">
            <h2 className="text-sm font-bold uppercase opacity-80">👑 建議換取項目</h2>
            <div className="text-4xl font-black mt-2">{bestItem?.name}</div>
            <div className="mt-4 pt-4 border-t border-white/20 text-sm">
              💡 1 WC 可換得 {Math.round(bestItem?.roi).toLocaleString()} 楓幣
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-lg font-bold mb-4">📈 效益排行</h2>
            <div className="space-y-3">
              {results.map((item, index) => (
                <div key={item.id} className={`flex justify-between p-3 rounded-lg ${index === 0 ? 'bg-orange-600/20 border border-orange-600/30' : 'bg-slate-900/50'}`}>
                  <span>{item.name}</span>
                  <span className={index === 0 ? 'text-orange-500 font-bold' : 'text-slate-400'}>
                    {(item.roi / 10000).toFixed(2)} W / WC
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;