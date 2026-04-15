import { createClient } from '@supabase/supabase-js'

// 這裡會自動去抓你 .env 檔案裡面的網址跟金鑰
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

// 建立並輸出這個 supabase 工具，讓其他檔案可以使用
export const supabase = createClient(supabaseUrl, supabaseAnonKey)