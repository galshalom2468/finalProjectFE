import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { supabase } from '../../config/supabase';
import { useNavigate } from "react-router-dom";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';
import HandLoader from "../../components/HandLoader";

export function Dashboard() {
  const [stats, setStats] = useState({
    summariesCount: 0,
    viewsCount: 0,
    savedCount: 0,
    averageRating: 0,
  });
  const [subjectData, setSubjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [errorCount, setErrorCount] = useState(0);
  const [pageLoadTime, setPageLoadTime] = useState(null);
  const [tti, setTTI] = useState(null);
  const [memoryUsage, setMemoryUsage] = useState(null);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF6347', '#9400D3', '#32CD32', '#FFD700', '#4682B4'];

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const start = Date.now();
      
      const { count: summariesCount } = await supabase
        .from('summaries')
        .select('*', { count: 'exact', head: true });
      const { count: viewsCount } = await supabase
        .from('history')
        .select('*', { count: 'exact', head: true });
      const { count: savedCount } = await supabase
        .from('summaries')
        .select('*', { count: 'exact', head: true })
        .eq('is_saved', true);
      const { data: ratingsData } = await supabase
        .from('summaries')
        .select('rating');
      
      const { data: subjectDistribution } = await supabase
        .from('summaries')
        .select('subject');
      
      const subjectCount = {};
      subjectDistribution?.forEach(summary => {
        subjectCount[summary.subject] = (subjectCount[summary.subject] || 0) + 1;
      });
      const subjectData = Object.entries(subjectCount).map(([name, value]) => ({
        name,
        value
      }));

      const { data: viewsData } = await supabase
        .from('history')
        .select('created_at')
        .order('created_at', { ascending: true });
      
      const viewsByDate = {};
      viewsData?.forEach(view => {
        const date = new Date(view.created_at).toLocaleDateString();
        viewsByDate[date] = (viewsByDate[date] || 0) + 1;
      });
  

      const { data: ratingsOverTimeData } = await supabase
        .from('summaries')
        .select('rating, created_at')
        .order('created_at', { ascending: true });
      
      const ratingsByDate = {};
      ratingsOverTimeData?.forEach(rating => {
        const date = new Date(rating.created_at).toLocaleDateString();
        if (!ratingsByDate[date]) {
          ratingsByDate[date] = { sum: 0, count: 0 };
        }
        ratingsByDate[date].sum += rating.rating || 0;
        ratingsByDate[date].count += 1;
      });

      let averageRating = 0;
      if (ratingsData && ratingsData.length > 0) {
        const sum = ratingsData.reduce((acc, cur) => acc + (cur.rating || 0), 0);
        averageRating = (sum / ratingsData.length).toFixed(2);
      }

      setStats({
        summariesCount: summariesCount || 0,
        viewsCount: viewsCount || 0,
        savedCount: savedCount || 0,
        averageRating: averageRating || 0,
      });
      setSubjectData(subjectData);

    
      const elapsed = Date.now() - start;
      const minLoading = 4000;
      if (elapsed < minLoading) {
        setTimeout(() => setLoading(false), minLoading - elapsed);
      } else {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  useEffect(() => {
    setPageLoadTime(getPageLoadTime());
    setTTI(getTTI());

    const memInterval = setInterval(() => {
      setMemoryUsage(getMemoryUsageMB());
    }, 1000);

    const handler = () => setErrorCount(count => count + 1);
    window.addEventListener('error', handler);

    return () => {
      clearInterval(memInterval);
      window.removeEventListener('error', handler);
    };
  }, []);

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const distance = 40; 
    const x = cx + (outerRadius + distance) * Math.cos(-midAngle * RADIAN);
    const y = cy + (outerRadius + distance) * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#222"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={16}
        fontWeight="bold"
        style={{ filter: 'drop-shadow(0 1px 2px #fff)' }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  function getPageLoadTime() {
    if (window.performance && window.performance.timing) {
      const { navigationStart, domContentLoadedEventEnd } = window.performance.timing;
      return domContentLoadedEventEnd - navigationStart; 
    }
    return null;
  }

  function getTTI() {
    if (window.performance && window.performance.timing) {
      const { navigationStart, domInteractive } = window.performance.timing;
      return domInteractive - navigationStart; 
    }
    return null;
  }

  function getMemoryUsageMB() {
    if (window.performance && window.performance.memory) {
      return (window.performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2); 
    }
    return null;
  }

  const getStatBoxClassName = (statLabel, value) => {
    const baseClass = styles.statBox;
    const warningClass = styles.statBoxWarning;
    const successClass = styles.statBoxSuccess;
    const mediumClass = styles.statBoxMedium;

    switch (statLabel) {
      case 'ממוצע דירוג סיכומים':
        if (value >= 4) return `${baseClass} ${successClass}`;
        if (value >= 3) return `${baseClass} ${mediumClass}`;
        return `${baseClass} ${warningClass}`;
      case 'Page Load Time':
        if (value > 50) return `${baseClass} ${warningClass}`;
        if (value < 25) return `${baseClass} ${successClass}`;
        return baseClass;
      case 'Time to Interactive':
        if (value > 3000) return `${baseClass} ${warningClass}`;
        if (value < 1500) return `${baseClass} ${successClass}`;
        return baseClass;
      case 'שגיאות JS':
        if (value > 0) return `${baseClass} ${warningClass}`;
        return `${baseClass} ${successClass}`;
      case 'שימוש בזיכרון':
        if (value > 100) return `${baseClass} ${warningClass}`;
        if (value < 50) return `${baseClass} ${successClass}`;
        return baseClass;
      default:
        return baseClass;
    }
  };

  return (
    <div className={styles.dashboardPage}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button className={styles.backHomeButton} onClick={() => navigate("/home")}>חזרה לבית</button>
      </div>
      <h1 className={styles.title}>דשבורד - סטטיסטיקות וביצועי האתר</h1>
      {loading ? (
        <HandLoader />
      ) : (
        <>
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <div className={styles.statLabel}>סך כל הסיכומים</div>
              <div className={styles.statValue}>{stats.summariesCount}</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statLabel}>סך כל הצפיות בסיכומים</div>
              <div className={styles.statValue}>{stats.viewsCount}</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statLabel}>סיכומים שמורים</div>
              <div className={styles.statValue}>{stats.savedCount}</div>
            </div>
            <div className={getStatBoxClassName('ממוצע דירוג סיכומים', parseFloat(stats.averageRating))}>
              <div className={styles.statLabel}>ממוצע דירוג סיכומים</div>
              <div className={styles.statValue}>{stats.averageRating}</div>
            </div>
            <div className={getStatBoxClassName('Time to Interactive', tti)}>
              <div className={styles.statLabel}>Time to Interactive</div>
              <div className={styles.statValue}>{tti ? `${tti} ms` : "N/A"}</div>
            </div>
            <div className={getStatBoxClassName('Page Load Time', pageLoadTime)}>
              <div className={styles.statLabel}>Page Load Time</div>
              <div className={styles.statValue}>{pageLoadTime ? `${pageLoadTime} ms` : "N/A"}</div>
            </div>
            <div className={getStatBoxClassName('שגיאות JS', errorCount)}>
              <div className={styles.statLabel}>שגיאות JS</div>
              <div className={styles.statValue}>{errorCount}</div>
            </div>
            <div className={getStatBoxClassName('שימוש בזיכרון', memoryUsage)}>
              <div className={styles.statLabel}>שימוש בזיכרון</div>
              <div className={styles.statValue}>{memoryUsage ? `${memoryUsage} MB` : "N/A"}</div>
            </div>
          </div>

          <div className={styles.chartsGrid}>
            <div className={styles.chartContainer}>
              <h3>חלוקת סיכומים לפי נושאים</h3>
              <ResponsiveContainer width="100%" height={380}>
                <BarChart data={subjectData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    domain={[0, 'dataMax + 1']}
                    allowDecimals={false}
                    tick={{ dx: -10 }}
                  />
                  <Tooltip />
                  <Legend formatter={(value) => "מקצועות"} />
                  <Bar 
                    dataKey="value" 
                    name="מקצועות"
                  >
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.chartContainer}>
              <h3>התפלגות מקצועות</h3>
              <ResponsiveContainer width="100%" height={380}>
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={110}
                    fill="#8884d8"
                    dataKey="value"
                    label={renderCustomizedLabel}
                  >
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-pie-${index}`} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#fff', border: '1px solid #eee', borderRadius: 8 }}
                    itemStyle={{ color: '#222', fontWeight: 'bold' }}
                  />
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    iconType="circle"
                    wrapperStyle={{ fontSize: 16 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 