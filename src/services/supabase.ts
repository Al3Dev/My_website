import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gybdxajmoefoivmoxjst.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5YmR4YWptb2Vmb2l2bW94anN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzODA0NTksImV4cCI6MjA2NTk1NjQ1OX0.2RfDgue1CUeit-MV7XfTxYasrQrNXhrHU-OY9WBeNkQ';

export const supabase = createClient(supabaseUrl, supabaseKey);
