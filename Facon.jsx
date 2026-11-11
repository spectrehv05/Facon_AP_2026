import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from "recharts";
import { Home, Plus, BarChart2, User, Search, Droplets, Flame, Zap, Utensils, Gem, Dumbbell, X, Check, Wallet, Target, Gauge as GaugeIcon, Trophy, TrendingUp, Activity } from "lucide-react";

const FOOD_DB = [
  // ── Original Items ───────────────────────────────────────────
  { id: 1,  name: "Chicken Breast (100g)",        calories: 165, protein: 31,  carbs: 0,    fat: 3.6, icon: "🍗" },
  { id: 2,  name: "White Rice (1 cup)",            calories: 206, protein: 4.3, carbs: 44.5, fat: 0.4, icon: "🍚" },
  { id: 3,  name: "Pizza Slice",                   calories: 285, protein: 12,  carbs: 35,   fat: 10,  icon: "🍕" },
  { id: 4,  name: "Banana",                        calories: 89,  protein: 1.1, carbs: 22.8, fat: 0.3, icon: "🍌" },
  { id: 5,  name: "Whole Egg",                     calories: 78,  protein: 6,   carbs: 0.6,  fat: 5,   icon: "🥚" },
  { id: 6,  name: "Greek Yogurt (200g)",           calories: 130, protein: 17,  carbs: 9,    fat: 3,   icon: "🥛" },
  { id: 7,  name: "Avocado Toast",                 calories: 320, protein: 9,   carbs: 30,   fat: 18,  icon: "🥑" },
  { id: 8,  name: "Oatmeal (1 cup)",               calories: 158, protein: 6,   carbs: 27,   fat: 3,   icon: "🌾" },
  { id: 9,  name: "Salmon (100g)",                 calories: 208, protein: 20,  carbs: 0,    fat: 13,  icon: "🐟" },
  { id: 10, name: "Latte (Grande)",                calories: 190, protein: 10,  carbs: 24,   fat: 7,   icon: "☕" },
  { id: 11, name: "Burger",                        calories: 550, protein: 30,  carbs: 42,   fat: 28,  icon: "🍔" },
  { id: 12, name: "Caesar Salad",                  calories: 180, protein: 8,   carbs: 10,   fat: 12,  icon: "🥗" },
  { id: 13, name: "Apple",                         calories: 72,  protein: 0.4, carbs: 19,   fat: 0.2, icon: "🍎" },
  { id: 14, name: "Almonds (30g)",                 calories: 174, protein: 6,   carbs: 6,    fat: 15,  icon: "🥜" },
  { id: 15, name: "Pasta (1 cup)",                 calories: 220, protein: 8,   carbs: 43,   fat: 1.3, icon: "🍝" },
  { id: 16, name: "Protein Bar",                   calories: 200, protein: 20,  carbs: 22,   fat: 7,   icon: "🍫" },
  { id: 17, name: "Orange Juice (250ml)",          calories: 112, protein: 1.7, carbs: 26,   fat: 0.5, icon: "🍊" },
  { id: 18, name: "Sweet Potato (150g)",           calories: 129, protein: 3,   carbs: 30,   fat: 0.1, icon: "🍠" },
  { id: 19, name: "Whey Protein Shake",            calories: 150, protein: 25,  carbs: 8,    fat: 2,   icon: "🥤" },
  { id: 20, name: "Sushi (8 pieces)",              calories: 350, protein: 22,  carbs: 50,   fat: 5,   icon: "🍱" },

  // ── Indian Rice & Biryani ────────────────────────────────────
  { id: 21, name: "Chicken Biryani (1 plate)",     calories: 490, protein: 28,  carbs: 58,   fat: 14,  icon: "🍛" },
  { id: 22, name: "Mutton Biryani (1 plate)",      calories: 540, protein: 30,  carbs: 56,   fat: 18,  icon: "🍛" },
  { id: 23, name: "Veg Biryani (1 plate)",         calories: 350, protein: 9,   carbs: 62,   fat: 8,   icon: "🍛" },
  { id: 24, name: "Egg Fried Rice (1 plate)",      calories: 320, protein: 12,  carbs: 48,   fat: 9,   icon: "🍳" },
  { id: 25, name: "Jeera Rice (1 cup)",            calories: 230, protein: 4,   carbs: 46,   fat: 4,   icon: "🍚" },
  { id: 26, name: "Khichdi (1 bowl)",              calories: 280, protein: 11,  carbs: 48,   fat: 5,   icon: "🍚" },
  { id: 27, name: "Pulao (1 cup)",                 calories: 260, protein: 5,   carbs: 50,   fat: 5,   icon: "🍚" },
  { id: 28, name: "Curd Rice (1 bowl)",            calories: 220, protein: 7,   carbs: 40,   fat: 4,   icon: "🍚" },

  // ── Indian Breads ────────────────────────────────────────────
  { id: 29, name: "Roti / Chapati (1 piece)",      calories: 104, protein: 3,   carbs: 20,   fat: 2,   icon: "🫓" },
  { id: 30, name: "Naan (1 piece)",                calories: 262, protein: 8,   carbs: 45,   fat: 5,   icon: "🫓" },
  { id: 31, name: "Butter Naan (1 piece)",         calories: 320, protein: 8,   carbs: 46,   fat: 10,  icon: "🫓" },
  { id: 32, name: "Paratha Plain (1 piece)",       calories: 180, protein: 4,   carbs: 28,   fat: 6,   icon: "🫓" },
  { id: 33, name: "Aloo Paratha (1 piece)",        calories: 260, protein: 6,   carbs: 38,   fat: 9,   icon: "🫓" },
  { id: 34, name: "Puri (1 piece)",                calories: 130, protein: 2,   carbs: 18,   fat: 6,   icon: "🫓" },
  { id: 35, name: "Bhatura (1 piece)",             calories: 280, protein: 6,   carbs: 40,   fat: 11,  icon: "🫓" },
  { id: 36, name: "Dosa Plain (1 piece)",          calories: 165, protein: 4,   carbs: 30,   fat: 4,   icon: "🫔" },
  { id: 37, name: "Masala Dosa (1 piece)",         calories: 295, protein: 6,   carbs: 45,   fat: 9,   icon: "🫔" },
  { id: 38, name: "Uttapam (1 medium)",            calories: 210, protein: 6,   carbs: 36,   fat: 5,   icon: "🫔" },
  { id: 39, name: "Idli (2 pieces)",               calories: 138, protein: 4,   carbs: 28,   fat: 1,   icon: "🫔" },
  { id: 40, name: "Appam (2 pieces)",              calories: 160, protein: 3,   carbs: 32,   fat: 2,   icon: "🫔" },
  { id: 41, name: "Missi Roti (1 piece)",          calories: 130, protein: 5,   carbs: 22,   fat: 3,   icon: "🫓" },

  // ── Indian Curries & Gravies ─────────────────────────────────
  { id: 42, name: "Butter Chicken (1 bowl)",       calories: 340, protein: 28,  carbs: 12,   fat: 20,  icon: "🍛" },
  { id: 43, name: "Chicken Tikka Masala (1 bowl)", calories: 360, protein: 30,  carbs: 14,   fat: 20,  icon: "🍛" },
  { id: 44, name: "Palak Paneer (1 bowl)",         calories: 280, protein: 14,  carbs: 12,   fat: 18,  icon: "🥬" },
  { id: 45, name: "Paneer Butter Masala (1 bowl)", calories: 380, protein: 16,  carbs: 18,   fat: 25,  icon: "🍛" },
  { id: 46, name: "Shahi Paneer (1 bowl)",         calories: 420, protein: 18,  carbs: 16,   fat: 30,  icon: "🍛" },
  { id: 47, name: "Matar Paneer (1 bowl)",         calories: 290, protein: 13,  carbs: 20,   fat: 18,  icon: "🍛" },
  { id: 48, name: "Kadai Paneer (1 bowl)",         calories: 340, protein: 16,  carbs: 14,   fat: 24,  icon: "🍛" },
  { id: 49, name: "Dal Makhani (1 bowl)",          calories: 300, protein: 13,  carbs: 34,   fat: 12,  icon: "🫘" },
  { id: 50, name: "Dal Tadka (1 bowl)",            calories: 220, protein: 12,  carbs: 30,   fat: 6,   icon: "🫘" },
  { id: 51, name: "Dal Fry (1 bowl)",              calories: 200, protein: 11,  carbs: 28,   fat: 6,   icon: "🫘" },
  { id: 52, name: "Chana Masala (1 bowl)",         calories: 270, protein: 14,  carbs: 36,   fat: 7,   icon: "🫘" },
  { id: 53, name: "Rajma (1 bowl)",                calories: 255, protein: 13,  carbs: 38,   fat: 5,   icon: "🫘" },
  { id: 54, name: "Aloo Gobi (1 bowl)",            calories: 195, protein: 5,   carbs: 28,   fat: 8,   icon: "🥦" },
  { id: 55, name: "Aloo Matar (1 bowl)",           calories: 210, protein: 6,   carbs: 30,   fat: 8,   icon: "🥔" },
  { id: 56, name: "Baingan Bharta (1 bowl)",       calories: 165, protein: 4,   carbs: 20,   fat: 8,   icon: "🍆" },
  { id: 57, name: "Kadai Chicken (1 bowl)",        calories: 350, protein: 32,  carbs: 12,   fat: 20,  icon: "🍛" },
  { id: 58, name: "Chicken Curry (1 bowl)",        calories: 310, protein: 28,  carbs: 8,    fat: 18,  icon: "🍛" },
  { id: 59, name: "Mutton Curry (1 bowl)",         calories: 390, protein: 32,  carbs: 10,   fat: 24,  icon: "🍖" },
  { id: 60, name: "Fish Curry (1 bowl)",           calories: 280, protein: 26,  carbs: 8,    fat: 16,  icon: "🐟" },
  { id: 61, name: "Prawn Masala (1 bowl)",         calories: 260, protein: 24,  carbs: 10,   fat: 14,  icon: "🦐" },
  { id: 62, name: "Egg Curry (1 bowl)",            calories: 240, protein: 14,  carbs: 10,   fat: 16,  icon: "🥚" },
  { id: 63, name: "Saag Aloo (1 bowl)",            calories: 200, protein: 5,   carbs: 26,   fat: 9,   icon: "🥬" },
  { id: 64, name: "Korma Chicken (1 bowl)",        calories: 400, protein: 30,  carbs: 14,   fat: 26,  icon: "🍛" },
  { id: 65, name: "Vindaloo (1 bowl)",             calories: 370, protein: 28,  carbs: 12,   fat: 24,  icon: "🌶️" },

  // ── Indian Snacks & Street Food ──────────────────────────────
  { id: 66, name: "Samosa (1 piece)",              calories: 262, protein: 4,   carbs: 30,   fat: 14,  icon: "🥟" },
  { id: 67, name: "Pakora / Bhajiya (5 pcs)",      calories: 280, protein: 6,   carbs: 30,   fat: 16,  icon: "🥟" },
  { id: 68, name: "Pav Bhaji (1 plate)",           calories: 420, protein: 10,  carbs: 62,   fat: 14,  icon: "🥖" },
  { id: 69, name: "Vada Pav (1 piece)",            calories: 290, protein: 7,   carbs: 42,   fat: 10,  icon: "🥖" },
  { id: 70, name: "Chole Bhature (1 plate)",       calories: 580, protein: 16,  carbs: 80,   fat: 20,  icon: "🫓" },
  { id: 71, name: "Pani Puri (6 pieces)",          calories: 200, protein: 3,   carbs: 36,   fat: 5,   icon: "🥣" },
  { id: 72, name: "Bhel Puri (1 bowl)",            calories: 180, protein: 4,   carbs: 30,   fat: 5,   icon: "🥣" },
  { id: 73, name: "Sev Puri (1 plate)",            calories: 220, protein: 4,   carbs: 32,   fat: 8,   icon: "🥣" },
  { id: 74, name: "Dahi Puri (6 pieces)",          calories: 240, protein: 6,   carbs: 38,   fat: 7,   icon: "🥣" },
  { id: 75, name: "Aloo Tikki (2 pieces)",         calories: 240, protein: 4,   carbs: 34,   fat: 10,  icon: "🥔" },
  { id: 76, name: "Medu Vada (2 pieces)",          calories: 270, protein: 8,   carbs: 32,   fat: 13,  icon: "🍩" },
  { id: 77, name: "Kachori (1 piece)",             calories: 220, protein: 4,   carbs: 26,   fat: 12,  icon: "🥟" },
  { id: 78, name: "Dhokla (4 pieces)",             calories: 200, protein: 8,   carbs: 34,   fat: 4,   icon: "🟡" },
  { id: 79, name: "Poha (1 bowl)",                 calories: 250, protein: 5,   carbs: 44,   fat: 7,   icon: "🍚" },
  { id: 80, name: "Upma (1 bowl)",                 calories: 210, protein: 5,   carbs: 36,   fat: 6,   icon: "🍚" },
  { id: 81, name: "Rava Idli (2 pieces)",          calories: 160, protein: 4,   carbs: 28,   fat: 4,   icon: "🫔" },
  { id: 82, name: "Pongal (1 bowl)",               calories: 290, protein: 8,   carbs: 50,   fat: 7,   icon: "🍚" },
  { id: 83, name: "Kanda Poha (1 bowl)",           calories: 270, protein: 5,   carbs: 46,   fat: 8,   icon: "🍚" },
  { id: 84, name: "Sabudana Khichdi (1 bowl)",     calories: 330, protein: 4,   carbs: 60,   fat: 8,   icon: "🍚" },
  { id: 85, name: "Misal Pav (1 plate)",           calories: 380, protein: 12,  carbs: 56,   fat: 12,  icon: "🥣" },
  { id: 86, name: "Dabeli (1 piece)",              calories: 240, protein: 5,   carbs: 38,   fat: 8,   icon: "🥖" },
  { id: 87, name: "Papdi Chaat (1 plate)",         calories: 260, protein: 7,   carbs: 40,   fat: 9,   icon: "🥣" },
  { id: 88, name: "Raj Kachori (1 piece)",         calories: 310, protein: 8,   carbs: 46,   fat: 12,  icon: "🥣" },
  { id: 89, name: "Corn Bhel (1 bowl)",            calories: 190, protein: 4,   carbs: 34,   fat: 5,   icon: "🌽" },
  { id: 90, name: "Murukku (30g)",                 calories: 160, protein: 3,   carbs: 22,   fat: 7,   icon: "🌀" },

  // ── Indian Grills & Tandoor ──────────────────────────────────
  { id: 91, name: "Chicken Tikka (6 pcs)",         calories: 290, protein: 38,  carbs: 6,    fat: 13,  icon: "🍢" },
  { id: 92, name: "Seekh Kebab (2 pieces)",        calories: 260, protein: 24,  carbs: 8,    fat: 15,  icon: "🍢" },
  { id: 93, name: "Tandoori Chicken (half)",       calories: 320, protein: 42,  carbs: 4,    fat: 14,  icon: "🍗" },
  { id: 94, name: "Paneer Tikka (6 pcs)",          calories: 310, protein: 20,  carbs: 8,    fat: 22,  icon: "🧀" },
  { id: 95, name: "Reshmi Kebab (2 pieces)",       calories: 280, protein: 26,  carbs: 6,    fat: 17,  icon: "🍢" },
  { id: 96, name: "Boti Kebab (2 pieces)",         calories: 240, protein: 28,  carbs: 4,    fat: 13,  icon: "🍢" },
  { id: 97, name: "Galouti Kebab (2 pieces)",      calories: 270, protein: 22,  carbs: 10,   fat: 16,  icon: "🍢" },
  { id: 98, name: "Hara Bhara Kebab (2 pieces)",   calories: 190, protein: 7,   carbs: 24,   fat: 8,   icon: "🥬" },

  // ── South Indian Specialties ─────────────────────────────────
  { id: 99,  name: "Sambhar (1 bowl)",             calories: 130, protein: 7,   carbs: 20,   fat: 3,   icon: "🫘" },
  { id: 100, name: "Rasam (1 bowl)",               calories: 60,  protein: 2,   carbs: 10,   fat: 1,   icon: "🍵" },
  { id: 101, name: "Coconut Chutney (2 tbsp)",     calories: 80,  protein: 1,   carbs: 4,    fat: 7,   icon: "🥥" },
  { id: 102, name: "Chettinad Chicken (1 bowl)",   calories: 370, protein: 34,  carbs: 10,   fat: 22,  icon: "🍛" },
  { id: 103, name: "Kerala Fish Curry (1 bowl)",   calories: 290, protein: 26,  carbs: 10,   fat: 16,  icon: "🐟" },
  { id: 104, name: "Avial (1 bowl)",               calories: 180, protein: 4,   carbs: 18,   fat: 10,  icon: "🥥" },
  { id: 105, name: "Pesarattu (2 pieces)",         calories: 200, protein: 10,  carbs: 30,   fat: 4,   icon: "🫔" },
  { id: 106, name: "Bisi Bele Bath (1 bowl)",      calories: 310, protein: 10,  carbs: 50,   fat: 8,   icon: "🍛" },

  // ── North Indian Specialties ─────────────────────────────────
  { id: 107, name: "Sarson Ka Saag (1 bowl)",      calories: 210, protein: 6,   carbs: 20,   fat: 12,  icon: "🥬" },
  { id: 108, name: "Makki Ki Roti (1 piece)",      calories: 150, protein: 3,   carbs: 28,   fat: 3,   icon: "🫓" },
  { id: 109, name: "Litti Chokha (2 pieces)",      calories: 380, protein: 10,  carbs: 56,   fat: 14,  icon: "🥔" },
  { id: 110, name: "Dal Baati Churma (1 plate)",   calories: 620, protein: 16,  carbs: 84,   fat: 24,  icon: "🍛" },
  { id: 111, name: "Aloo Dum (1 bowl)",            calories: 230, protein: 4,   carbs: 34,   fat: 9,   icon: "🥔" },
  { id: 112, name: "Dum Aloo Kashmiri (1 bowl)",   calories: 260, protein: 5,   carbs: 36,   fat: 12,  icon: "🥔" },

  // ── Indian Sweets & Desserts ─────────────────────────────────
  { id: 113, name: "Gulab Jamun (2 pieces)",       calories: 370, protein: 5,   carbs: 56,   fat: 14,  icon: "🍮" },
  { id: 114, name: "Rasgulla (2 pieces)",          calories: 260, protein: 6,   carbs: 50,   fat: 4,   icon: "🍮" },
  { id: 115, name: "Jalebi (100g)",                calories: 360, protein: 3,   carbs: 70,   fat: 8,   icon: "🍬" },
  { id: 116, name: "Kheer (1 bowl)",               calories: 290, protein: 8,   carbs: 48,   fat: 8,   icon: "🍮" },
  { id: 117, name: "Gajar Halwa (1 bowl)",         calories: 350, protein: 5,   carbs: 54,   fat: 13,  icon: "🍮" },
  { id: 118, name: "Suji Halwa (1 bowl)",          calories: 320, protein: 4,   carbs: 50,   fat: 12,  icon: "🍮" },
  { id: 119, name: "Besan Ladoo (1 piece)",        calories: 180, protein: 4,   carbs: 26,   fat: 7,   icon: "🟡" },
  { id: 120, name: "Motichur Ladoo (1 piece)",     calories: 195, protein: 3,   carbs: 30,   fat: 7,   icon: "🟡" },
  { id: 121, name: "Barfi / Burfi (1 piece)",      calories: 160, protein: 4,   carbs: 24,   fat: 6,   icon: "🍬" },
  { id: 122, name: "Kaju Katli (2 pieces)",        calories: 200, protein: 5,   carbs: 28,   fat: 9,   icon: "🍬" },
  { id: 123, name: "Rasmalai (2 pieces)",          calories: 300, protein: 9,   carbs: 44,   fat: 10,  icon: "🍮" },
  { id: 124, name: "Sandesh (2 pieces)",           calories: 220, protein: 7,   carbs: 32,   fat: 8,   icon: "🍮" },
  { id: 125, name: "Peda (2 pieces)",              calories: 200, protein: 4,   carbs: 34,   fat: 6,   icon: "🟡" },
  { id: 126, name: "Imarti (100g)",                calories: 340, protein: 3,   carbs: 66,   fat: 7,   icon: "🍬" },
  { id: 127, name: "Chikki Peanut (30g)",          calories: 160, protein: 4,   carbs: 22,   fat: 7,   icon: "🥜" },
  { id: 128, name: "Shrikhand (1 bowl)",           calories: 280, protein: 9,   carbs: 44,   fat: 8,   icon: "🍮" },
  { id: 129, name: "Kulfi (1 stick)",              calories: 220, protein: 5,   carbs: 30,   fat: 9,   icon: "🍦" },
  { id: 130, name: "Malpua (2 pieces)",            calories: 310, protein: 5,   carbs: 50,   fat: 10,  icon: "🥞" },
  { id: 131, name: "Balushahi (1 piece)",          calories: 240, protein: 3,   carbs: 36,   fat: 10,  icon: "🍩" },
  { id: 132, name: "Mysore Pak (1 piece)",         calories: 230, protein: 3,   carbs: 30,   fat: 12,  icon: "🍬" },

  // ── Indian Beverages ─────────────────────────────────────────
  { id: 133, name: "Masala Chai (1 cup)",          calories: 80,  protein: 2,   carbs: 12,   fat: 3,   icon: "🍵" },
  { id: 134, name: "Lassi Sweet (1 glass)",        calories: 240, protein: 7,   carbs: 38,   fat: 7,   icon: "🥛" },
  { id: 135, name: "Lassi Salted (1 glass)",       calories: 150, protein: 6,   carbs: 18,   fat: 6,   icon: "🥛" },
  { id: 136, name: "Mango Lassi (1 glass)",        calories: 280, protein: 6,   carbs: 50,   fat: 6,   icon: "🥭" },
  { id: 137, name: "Thandai (1 glass)",            calories: 220, protein: 5,   carbs: 36,   fat: 7,   icon: "🥛" },
  { id: 138, name: "Shikanji / Nimbu Pani",        calories: 60,  protein: 0.5, carbs: 14,   fat: 0,   icon: "🍋" },
  { id: 139, name: "Aam Panna (1 glass)",          calories: 90,  protein: 0.5, carbs: 22,   fat: 0,   icon: "🥭" },
  { id: 140, name: "Jaljeera (1 glass)",           calories: 40,  protein: 0.5, carbs: 9,    fat: 0,   icon: "🌿" },
  { id: 141, name: "Chaas / Buttermilk (1 glass)", calories: 60,  protein: 3,   carbs: 7,    fat: 1,   icon: "🥛" },
  { id: 142, name: "Filter Coffee (1 cup)",        calories: 55,  protein: 2,   carbs: 7,    fat: 2,   icon: "☕" },
  { id: 143, name: "Badam Milk (1 glass)",         calories: 210, protein: 7,   carbs: 28,   fat: 8,   icon: "🥛" },

  // ── Indian Condiments & Sides ────────────────────────────────
  { id: 144, name: "Raita (1 bowl)",               calories: 95,  protein: 4,   carbs: 10,   fat: 4,   icon: "🥛" },
  { id: 145, name: "Mango Pickle (1 tbsp)",        calories: 30,  protein: 0.3, carbs: 3,    fat: 2,   icon: "🥭" },
  { id: 146, name: "Green Chutney (2 tbsp)",       calories: 20,  protein: 0.5, carbs: 3,    fat: 0.5, icon: "🌿" },
  { id: 147, name: "Tamarind Chutney (2 tbsp)",    calories: 45,  protein: 0.3, carbs: 11,   fat: 0.1, icon: "🟤" },
  { id: 148, name: "Papad / Papadum (1 piece)",    calories: 50,  protein: 2,   carbs: 8,    fat: 1,   icon: "🫓" },
];

const ACTIVITY_LEVELS = [
  { label: "Sedentary", desc: "Desk job, little exercise", multiplier: 1.2 },
  { label: "Lightly Active", desc: "Light exercise 1–3x / week", multiplier: 1.375 },
  { label: "Moderately Active", desc: "Exercise 3–5x / week", multiplier: 1.55 },
  { label: "Very Active", desc: "Hard exercise 6–7x / week", multiplier: 1.725 },
  { label: "Extra Active", desc: "Physical job + hard training", multiplier: 1.9 },
];
const BADGES = [
  { id: "first_log", name: "First Bite", desc: "Log first meal", Icon: Utensils, check: s => s.totalLogs >= 1 },
  { id: "budget_day", name: "Budget Master", desc: "Stay under budget 1 day", Icon: Gem, check: s => s.daysUnderBudget >= 1 },
  { id: "streak_3", name: "On Fire", desc: "3-day streak", Icon: Flame, check: s => s.streak >= 3 },
  { id: "protein_hero", name: "Protein Hero", desc: "Log 100g protein in a day", Icon: Dumbbell, check: s => s.bestProtein >= 100 },
  { id: "hydrated", name: "Hydrated", desc: "Drink 8 glasses water", Icon: Droplets, check: s => s.totalWater >= 8 },
  { id: "week_streak", name: "Week Warrior", desc: "7-day streak", Icon: Zap, check: s => s.streak >= 7 },
];
const C = { blue: "#12a9d6", teal: "#2ebd6b", amber: "#e39a12", warn: "#f0622d", ink: "#0e1d33", mute: "#8191a6" };

// Uses Claude's window.storage when present, otherwise localStorage (works in a normal Vite project)
const store = {
  get: async k => { try { if (window.storage) { const r = await window.storage.get(k); return r ? JSON.parse(r.value) : null; } const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch { return null; } },
  set: async (k, v) => { try { const s = JSON.stringify(v); if (window.storage) await window.storage.set(k, s); else localStorage.setItem(k, s); } catch {} },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&family=Archivo+Black&display=swap');
:root{--ink:${C.ink};--sub:#4d5f78;--mute:${C.mute};--blue:${C.blue};--warn:${C.warn};--glass:rgba(255,255,255,.55);--edge:rgba(255,255,255,.75)}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Hanken Grotesk',system-ui,sans-serif;color:var(--ink);font-variant-numeric:tabular-nums;overflow-x:hidden;min-height:100vh;
background:radial-gradient(900px 500px at 12% -5%,#ffffffcc,transparent 60%),radial-gradient(800px 600px at 100% 20%,#7fe0ecaa,transparent 60%),linear-gradient(180deg,#8fdcf0 0%,#c9f0f3 45%,#eefaf6 100%) fixed}
button{font-family:inherit;cursor:pointer;color:inherit}
input{font-family:inherit;color:var(--ink);background:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.9);outline:none;box-shadow:inset 0 1px 3px rgba(30,70,130,.10);transition:border-color .2s,box-shadow .2s}
input:focus-visible,button:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
input:focus{border-color:var(--blue)}
.glass{background:var(--glass);backdrop-filter:blur(22px) saturate(1.5);-webkit-backdrop-filter:blur(22px) saturate(1.5);border:1px solid var(--edge);border-radius:22px;box-shadow:0 10px 30px rgba(30,70,130,.10),inset 0 1px 0 #fff}
.card{padding:16px}
.hero{position:relative;overflow:hidden;color:#fff;border-radius:30px;padding:22px;background:linear-gradient(165deg,#083a5c 0%,#0e86a8 100%);box-shadow:0 18px 40px rgba(8,58,92,.35),inset 0 1px 0 rgba(255,255,255,.25)}
.hero::after{content:"";position:absolute;inset:0 0 55% 0;background:linear-gradient(180deg,rgba(255,255,255,.16),rgba(255,255,255,0));border-radius:30px 30px 60% 60%/30px 30px 40% 40%;pointer-events:none}
.hero.over{background:linear-gradient(165deg,#3b1a12 0%,#7a2e17 100%)}
.btn{border:none;border-radius:999px;font-weight:700;padding:13px 22px;font-size:15px;color:#fff;background:linear-gradient(180deg,#3fd0f0 0%,#0f8fc4 100%);box-shadow:0 6px 16px rgba(15,143,196,.35),inset 0 1px 0 rgba(255,255,255,.55);transition:transform .15s,opacity .2s}
.btn:active{transform:scale(.97)}.btn:disabled{opacity:.4;cursor:not-allowed}
.btn.ghost{background:rgba(255,255,255,.65);color:var(--ink);box-shadow:inset 0 1px 0 #fff,0 2px 8px rgba(30,70,130,.08)}
.btn.sm{padding:8px 16px;font-size:13px}
.row{display:flex;align-items:center}.between{justify-content:space-between}.gap{gap:10px}.col{display:flex;flex-direction:column}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:10px}.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.lbl{font-size:12px;color:var(--mute);font-weight:600}.sub{color:var(--sub)}
.h1{font-size:22px;font-weight:800;letter-spacing:-.5px}.big{font-weight:800;letter-spacing:-1.5px;line-height:1}
.chip{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;font-size:12px;font-weight:700;background:rgba(255,255,255,.6);border:1px solid var(--edge)}
.hero .chip{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.25);color:#fff}
.bar{height:6px;border-radius:9px;background:rgba(14,29,51,.09);overflow:hidden}.bar>i{display:block;height:100%;border-radius:9px;transition:width .6s ease}
.opt{width:100%;text-align:left;padding:14px 16px;border-radius:16px;border:1.5px solid rgba(255,255,255,.9);background:rgba(255,255,255,.5);transition:all .2s}
.opt.on{border-color:var(--blue);background:rgba(18,169,214,.10)}
.ico{width:34px;height:34px;border-radius:12px;display:grid;place-items:center;background:rgba(18,169,214,.12);color:var(--blue);flex:none}
.nav{position:fixed;bottom:16px;left:50%;transform:translateX(-50%);z-index:100;display:flex;gap:6px;padding:7px;border-radius:999px;background:rgba(255,255,255,.65);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);border:1px solid var(--edge);box-shadow:0 12px 30px rgba(30,70,130,.2),inset 0 1px 0 #fff}
.nav button{width:50px;height:50px;border-radius:50%;border:none;background:transparent;display:grid;place-items:center;color:var(--sub);transition:all .2s}
.nav button.on{background:linear-gradient(180deg,#1b3558,#0e1d33);color:#fff;box-shadow:0 4px 12px rgba(14,29,51,.4)}
.top{position:sticky;top:0;z-index:90;padding:10px 16px;display:flex;justify-content:space-between;align-items:center;background:rgba(235,243,251,.6);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-bottom:1px solid var(--edge)}
.wrap{max-width:580px;margin:0 auto;padding:16px 14px 110px}
.toast{position:fixed;top:68px;left:50%;transform:translateX(-50%);z-index:300;padding:10px 18px;border-radius:999px;font-size:13px;font-weight:700;background:#0e1d33;color:#fff;box-shadow:0 8px 24px rgba(14,29,51,.3);animation:up .25s ease}
.x{width:26px;height:26px;border-radius:50%;border:1px solid rgba(14,29,51,.12);background:rgba(255,255,255,.6);display:grid;place-items:center;color:var(--sub)}
.step{width:30px;height:30px;border-radius:50%;border:1px solid rgba(14,29,51,.12);background:rgba(255,255,255,.7);display:grid;place-items:center;font-size:18px;line-height:1}
@keyframes up{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}
@keyframes rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes pop{0%{transform:scale(1.06)}100%{transform:scale(1)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.82}}
.rise{animation:rise .4s ease}.pop{animation:pop .3s ease}.pulse{animation:pulse 2s infinite}
.logo{display:inline-block;font-family:'Archivo Black','Arial Black',sans-serif;color:#0a9f4e;letter-spacing:-1px;line-height:1;transform:skewX(-10deg);text-transform:uppercase}
.od{display:inline-block;height:1em;overflow:hidden;line-height:1;vertical-align:top}
.odc{display:flex;flex-direction:column;transition:transform 1.1s cubic-bezier(.2,.8,.2,1)}
.odc span{display:block;height:1em;line-height:1}
.hero .big{text-shadow:0 2px 14px rgba(0,50,80,.5)}
.zone{border:1.5px dashed transparent;transition:background .2s,box-shadow .2s,border-color .2s}
.zone.drag{border-color:rgba(255,255,255,.35)}
.zone.on{background:rgba(122,230,255,.16);border-color:rgba(122,230,255,.9);box-shadow:0 0 40px rgba(122,230,255,.45)}
.gulp{animation:gulp .35s ease}
@keyframes gulp{0%{transform:scale(1)}40%{transform:scale(.965)}100%{transform:scale(1)}}
.ftray{touch-action:none;user-select:none;-webkit-user-select:none;cursor:grab;display:inline-flex;align-items:center;gap:7px}
.pt{position:fixed;width:8px;height:8px;border-radius:50%;pointer-events:none;z-index:600;animation:burst .7s ease-out forwards}
@keyframes burst{from{transform:translate(-50%,-50%) translate(0,0) scale(1);opacity:1}to{transform:translate(-50%,-50%) translate(var(--dx),var(--dy)) scale(.2);opacity:0}}
.ring{position:fixed;width:120px;height:120px;border-radius:50%;border:2px solid #7ae6ff;pointer-events:none;z-index:600;animation:ringo .6s ease-out forwards}
@keyframes ringo{from{transform:translate(-50%,-50%) scale(.2);opacity:.9}to{transform:translate(-50%,-50%) scale(1);opacity:0}}
.skytxt{color:var(--sky-ink,var(--ink))!important;transition:color .8s}
.cloud{position:absolute;filter:blur(18px);will-change:transform;animation:drift linear infinite}
@keyframes drift{from{transform:translateX(-45vw)}to{transform:translateX(120vw)}}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`;

const todayKey = () => new Date().toISOString().split("T")[0];
const calcBMR = ({ gender, age, height, weight }) => { const b = 10 * weight + 6.25 * height - 5 * age; return gender === "male" ? b + 5 : b - 161; };
const calcTDEE = p => calcBMR(p) * ACTIVITY_LEVELS[Number(p.activityLevel)].multiplier;
const calcTarget = p => { const t = calcTDEE(p); return Math.round(p.goal === "cut" ? t - 500 : p.goal === "bulk" ? t + 300 : t); };
const calcBMI = ({ weight, height }) => (weight / ((height / 100) ** 2)).toFixed(1);
const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
const tip = { background: "#fff", border: "1px solid #dbe6f3", borderRadius: 12, fontSize: 12, color: C.ink };

function Logo({ size = 24 }) {
  return <span className="logo" style={{ fontSize: size }}>FACON</span>;
}
function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (<div><label className="lbl" style={{ display: "block", marginBottom: 6 }}>{label}</label>
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} type={type} style={{ width: "100%", padding: "13px 16px", borderRadius: 14, fontSize: 15 }} /></div>);
}
function Macro({ label, val, target, color }) {
  return (<div className="glass card" style={{ padding: 14, borderRadius: 18 }}>
    <div className="lbl" style={{ marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 22, fontWeight: 800, color, marginBottom: 8 }}>{Math.round(val)}<span className="lbl" style={{ marginLeft: 2 }}>g</span></div>
    <div className="bar"><i style={{ width: `${Math.min(val / Math.max(target, 1) * 100, 100)}%`, background: color }} /></div>
    <div className="lbl" style={{ marginTop: 5 }}>of {target}g</div>
  </div>);
}

// Odometer: every digit is a 0-9 reel that rolls to its value
function Digit({ d, delay }) {
  const [x, setX] = useState(0);
  useEffect(() => { const id = requestAnimationFrame(() => setX(d)); return () => cancelAnimationFrame(id); }, [d]);
  return <span className="od"><span className="odc" style={{ transform: `translateY(-${x}em)`, transitionDelay: `${delay}ms` }}>{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => <span key={n}>{n}</span>)}</span></span>;
}
function Odometer({ value }) {
  const chars = Math.round(value).toLocaleString("en-US").split("");
  return (
    <span role="img" aria-label={String(Math.round(value))} style={{ display: "inline-flex", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1 }}>
      {chars.map((c, i) => /\d/.test(c) ? <Digit key={chars.length - i} d={+c} delay={i * 40} /> : <span key={chars.length - i} style={{ height: "1em", lineHeight: 1 }}>{c}</span>)}
    </span>
  );
}

// The wallet as a glass orb: liquid level = credits remaining. Drains as you log, empties when overspent.
function Orb({ pct, over, hover }) {
  const level = over ? 0 : Math.max(0, 100 - pct), low = level < 15, top = 212 - level * 2;
  const c1 = low ? "#ffd27a" : "#5fd6f2", c2 = low ? "#e8820f" : "#0b7fb3";
  const wave = "M0 0Q27.5 -9 55 0T110 0T165 0T220 0T275 0T330 0T385 0T440 0V260H0Z";
  return (
    <svg viewBox="0 0 220 220" width="100%" aria-hidden="true" style={{ display: "block" }}>
      <defs>
        <clipPath id="orbclip"><circle cx="110" cy="110" r="100" /></clipPath>
        <linearGradient id="liq" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={c1} /><stop offset="1" stopColor={c2} /></linearGradient>
        <radialGradient id="glassfill" cx="50%" cy="35%" r="70%"><stop offset="0" stopColor="#fff" stopOpacity=".16" /><stop offset="1" stopColor="#fff" stopOpacity=".03" /></radialGradient>
        <radialGradient id="spec"><stop offset="0" stopColor="#fff" stopOpacity=".75" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="110" cy="110" r="100" fill="url(#glassfill)" />
      <circle cx="110" cy="110" r="106" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="3" strokeDasharray="1.2 7.13" />
      <circle cx="110" cy="110" r="106" fill="none" stroke={over ? "#ff9a72" : "#7ae6ff"} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="666" strokeDashoffset={666 * (1 - Math.min(pct, 100) / 100)} transform="rotate(-90 110 110)" style={{ transition: "stroke-dashoffset .9s ease" }} />
      <g clipPath="url(#orbclip)">
        <g style={{ transform: `translateY(${top}px)`, transition: "transform 1s cubic-bezier(.3,.7,.2,1)" }}>
          <g className="wave w2" opacity=".5"><path d={wave} fill="url(#liq)" /></g>
          <g className="wave w1"><path d={wave} fill="url(#liq)" /></g>
        </g>
        {level > 8 && [[70, 0, 3, 5.5], [110, 1.4, 2.2, 7], [150, .7, 3.4, 6.2], [90, 2.6, 1.8, 8], [130, 3.4, 2.6, 5]].map(([x, dl, r, du], i) =>
          <circle key={i} className="bub" cx={x} cy={196} r={r} fill="#fff" style={{ "--rise": `${level * 2 - 20}px`, animationDelay: `${dl}s`, animationDuration: `${du}s` }} />)}
      </g>
      <circle className={over ? "pulse" : ""} cx="110" cy="110" r="100" fill="none" stroke={over ? "#ff9a72" : hover ? "#7ae6ff" : "rgba(255,255,255,.55)"} strokeWidth={over ? 3 : 2} />
      <path d="M50 168Q110 205 170 168" fill="none" stroke="#fff" strokeOpacity=".25" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="72" cy="52" rx="34" ry="16" transform="rotate(-32 72 52)" fill="url(#spec)" />
    </svg>
  );
}
function Gauge({ pct, over }) {
  const d = "M22 110A88 88 0 0 1 198 110", len = Math.PI * 88;
  return (<svg viewBox="0 0 220 120" width="100%" aria-hidden="true">
    <path d={d} fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="12" strokeLinecap="round" />
    <path d={d} fill="none" stroke={over ? "#ff9a72" : "#7ae6ff"} strokeWidth="12" strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - Math.min(pct, 100) / 100)} style={{ transition: "stroke-dashoffset .9s ease" }} />
  </svg>);
}

const hex2 = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mixc = (st, m) => { const x = Math.min(Math.max(m, 0), 2), i = x >= 1 ? 1 : 0, t = x - i, a = hex2(st[i]), b = hex2(st[i + 1]); return "#" + a.map((v, k) => Math.round(v + (b[k] - v) * t).toString(16).padStart(2, "0")).join(""); };
const SKY = { top: ["#38b6e8", "#9dc3d6", "#2b2742"], mid: ["#a8ecf5", "#f1dcb8", "#7b3b3d"], low: ["#e9fbf4", "#fbe6cc", "#f0622d"], cloud: ["#ffffff", "#f4ece4", "#3a3550"], sun: ["#fff6d2", "#ffb86b", "#ff6a3d"] };
const HILL = { back: ["#7fe3a0", "#b9b98a", "#33384a"], front: ["#3ccf6e", "#8aa85a", "#1d2a30"] };
const skyLabel = m => m < .2 ? "Clear skies" : m < .55 ? "A few clouds" : m < .85 ? "Haze rolling in" : m <= 1 ? "Golden hour, nearly spent" : "Storm: you are overspent";
const CLOUDS = [[8, -10, 420, 150, .9, 90], [22, 30, 520, 170, .75, 130], [40, -25, 380, 130, .8, 110], [58, 55, 560, 180, .7, 150], [75, 10, 440, 150, .8, 100]];
// m: 0 = fresh budget (clear sky), 1 = budget spent (golden haze), up to 2 = badly overspent (storm)
function Sky({ m }) {
  const [v, setV] = useState(m), cur = useRef(m);
  useEffect(() => {
    let raf; const tick = () => { const d = m - cur.current; if (Math.abs(d) < .002) { cur.current = m; setV(m); return; } cur.current += d * .06; setV(cur.current); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [m]);
  const top = mixc(SKY.top, v), mid = mixc(SKY.mid, v), low = mixc(SKY.low, v), cl = mixc(SKY.cloud, v), sun = mixc(SKY.sun, v), sz = 360 + v * 140;
  return (
    <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: -1, overflow: "hidden", background: `linear-gradient(180deg,${top} 0%,${mid} 55%,${low} 100%)` }}>
      <div style={{ position: "absolute", right: "-6%", top: `${4 + Math.min(v, 1.3) * 36}%`, width: sz, height: sz, borderRadius: "50%", background: `radial-gradient(closest-side,${sun},${sun}00)`, opacity: .9 }} />
      {CLOUDS.map(([t, l, w, h, o, d], i) => <div key={i} className="cloud" style={{ top: `${t}%`, left: `${l}%`, width: w, height: h, opacity: o * (v > 1 ? .55 : 1), background: `radial-gradient(closest-side,${cl},${cl}00)`, animationDuration: `${d}s`, animationDelay: `-${i * 23}s` }} />)}
      <div style={{ position: "absolute", left: "-25%", bottom: "-20%", width: "150%", height: "36%", borderRadius: "50%", background: mixc(HILL.back, v) }} />
      <div style={{ position: "absolute", left: "-10%", bottom: "-24%", width: "130%", height: "32%", borderRadius: "50%", background: mixc(HILL.front, v) }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(0deg,${low},transparent 65%)`, opacity: Math.min(v, 1.4) * .45 }} />
    </div>
  );
}
const Head = ({ title, sub }) => (<div style={{ marginBottom: 16 }}><div className="h1 skytxt">{title}</div><div className="skytxt" style={{ fontSize: 14, marginTop: 2, opacity: .75 }}>{sub}</div></div>);

export default function App() {
  const [view, setView] = useState("landing");
  const [profile, setProfile] = useState(null);
  const [logs, setLogs] = useState({});
  const [water, setWater] = useState({});
  const [stats, setStats] = useState({ xp: 0, streak: 0, lastLogDate: null, daysUnderBudget: 0, totalLogs: 0, totalWater: 0, bestProtein: 0 });
  const [tab, setTab] = useState("overview");
  const [ready, setReady] = useState(false);
  const [balanceKey, setBalanceKey] = useState(0);

  useEffect(() => {
    (async () => {
      const [p, l, w, s] = await Promise.all(["cb_profile", "cb_logs", "cb_water", "cb_stats"].map(k => store.get(k)));
      if (p) { setProfile(p); setView("dashboard"); }
      if (l) setLogs(l); if (w) setWater(w); if (s) setStats(s);
      setReady(true);
    })();
  }, []);
  const save = useCallback((k, v) => store.set(k, v), []);

  const today = todayKey();
  const todayLogs = logs[today] || [];
  const todayWater = water[today] || 0;
  const dailyTarget = profile ? calcTarget(profile) : 2000;
  const totalSpent = useMemo(() => todayLogs.reduce((s, e) => s + e.calories, 0), [todayLogs]);
  const remaining = dailyTarget - totalSpent;
  const isOver = remaining < 0;
  const budgetPct = Math.min((totalSpent / dailyTarget) * 100, 100);

  const completeOnboarding = p => { setProfile(p); save("cb_profile", p); setView("dashboard"); };

  const addFood = (food, servings = 1) => {
    const entry = {
      id: Date.now(), name: food.name, icon: food.icon || "🍽️",
      calories: Math.round(food.calories * servings),
      protein: Math.round(food.protein * servings * 10) / 10,
      carbs: Math.round(food.carbs * servings * 10) / 10,
      fat: Math.round(food.fat * servings * 10) / 10,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const newLogs = { ...logs, [today]: [...(logs[today] || []), entry] };
    setLogs(newLogs); save("cb_logs", newLogs); setBalanceKey(k => k + 1);
    const todayProtein = newLogs[today].reduce((s, e) => s + e.protein, 0);
    const y = new Date(); y.setDate(y.getDate() - 1);
    const yKey = y.toISOString().split("T")[0];
    const ns = {
      ...stats, totalLogs: stats.totalLogs + 1, xp: stats.xp + Math.round(food.calories * servings / 10),
      streak: stats.lastLogDate === yKey ? stats.streak + 1 : stats.lastLogDate === today ? stats.streak : 1,
      lastLogDate: today, bestProtein: Math.max(stats.bestProtein, todayProtein),
    };
    setStats(ns); save("cb_stats", ns);
  };
  const removeFood = id => {
    const nl = { ...logs, [today]: todayLogs.filter(e => e.id !== id) };
    setLogs(nl); save("cb_logs", nl); setBalanceKey(k => k + 1);
  };
  const addWater = () => {
    const nw = { ...water, [today]: todayWater + 1 };
    setWater(nw); save("cb_water", nw);
    const ns = { ...stats, totalWater: stats.totalWater + 1 };
    setStats(ns); save("cb_stats", ns);
  };

  const mood = isOver ? 1 + Math.min(Math.abs(remaining) / dailyTarget / 0.25, 1) : budgetPct / 100;
  const sum = k => todayLogs.reduce((s, e) => s + (e[k] || 0), 0);
  const ctx = { mood, profile, logs, todayLogs, addFood, removeFood, addWater, totalSpent, remaining, isOver, dailyTarget, todayWater, stats, budgetPct, balanceKey, totalProtein: sum("protein"), totalCarbs: sum("carbs"), totalFat: sum("fat") };

  if (!ready) return (<><style>{css}</style>
    <div className="col" style={{ height: "100vh", alignItems: "center", justifyContent: "center", gap: 14 }}>
      <div style={{ width: 38, height: 38, border: `3px solid ${C.blue}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
      <div className="sub" style={{ fontSize: 14 }}>Loading your wallet</div></div></>);

  return (<>
    <style>{css}</style>
    <Sky m={view === "dashboard" && profile ? mood : 0} />
    {view === "landing" && <Landing onStart={() => setView("onboarding")} />}
    {view === "onboarding" && <Onboarding onComplete={completeOnboarding} />}
    {view === "dashboard" && profile && <Dashboard ctx={ctx} tab={tab} setTab={setTab} />}
  </>);
}

function Landing({ onStart }) {
  const [bal, setBal] = useState(0);
  useEffect(() => { const t = setTimeout(() => setBal(1732), 500); return () => clearTimeout(t); }, []);
  const sample = [["🥚", "Eggs & Toast", -156, "8:30 AM"], ["☕", "Morning Latte", -190, "9:15 AM"], ["🥗", "Caesar Salad", -180, "1:00 PM"], ["🐟", "Salmon + Rice", -342, "7:30 PM"]];
  const feats = [
    [Wallet, "Calorie Wallet", "Daily calories as spendable credits. Real-time balance with finance-style UI."],
    [BarChart2, "Macro Tracking", "Protein, carbs, and fat tracked with clear progress bars."],
    [Trophy, "Gamification", "Earn XP, build streaks, unlock badges. Make healthy eating a habit."],
    [TrendingUp, "Analytics", "Weekly calorie trends, budget performance, and macro breakdown charts."],
    [Target, "Smart Targets", "Mifflin-St Jeor BMR + TDEE with goals for cut, maintain, or bulk."],
    [Droplets, "Hydration", "Track water intake alongside your calorie wallet every day."],
  ];
  return (
    <div>
      <nav className="row between" style={{ maxWidth: 1000, margin: "0 auto", padding: "18px 24px" }}><Logo /><button className="btn sm" onClick={onStart}>Get started</button></nav>
      <div className="rise" style={{ textAlign: "center", padding: "70px 24px 40px" }}>
        <div className="chip" style={{ marginBottom: 22 }}><Zap size={13} color={C.blue} /> The future of diet tracking</div>
        <h1 style={{ fontSize: "clamp(42px,7vw,84px)", fontWeight: 800, lineHeight: 1.03, letterSpacing: -3, marginBottom: 20 }}>Track calories<br />like money.</h1>
        <p className="sub" style={{ fontSize: "clamp(15px,2vw,19px)", maxWidth: 470, margin: "0 auto 32px", lineHeight: 1.6 }}>Your daily calories are a spendable wallet. Spend wisely, stay in budget, and reach your goal.</p>
        <button className="btn" onClick={onStart} style={{ padding: "16px 38px", fontSize: 17 }}>Open my wallet</button>
        <p className="lbl" style={{ marginTop: 14 }}>Free. No signup. Saves locally.</p>
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto 70px", padding: "0 18px" }}>
        <div className="hero">
          <div className="lbl" style={{ color: "#bfeaf5" }}>Daily wallet</div>
          <div style={{ position: "relative", maxWidth: 240, margin: "6px auto 0" }}><Orb pct={28} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}><div className="big" style={{ fontSize: 44 }}><Odometer value={bal} /></div><div style={{ fontSize: 12, marginTop: 6, color: "#e3f8ff" }}>credits remaining</div></div></div>
          <div className="row between" style={{ fontSize: 13, color: "#bfeaf5", marginTop: 10 }}><span>668 spent</span><span>2,400 budget</span></div>
        </div>
        <div className="glass" style={{ marginTop: 12, overflow: "hidden" }}>
          {sample.map(([i, n, c, t], k) => (<div key={k} className="row between" style={{ padding: "12px 16px", borderTop: k ? "1px solid rgba(14,29,51,.06)" : "none" }}>
            <div className="row gap"><span style={{ fontSize: 22 }}>{i}</span><div><div style={{ fontSize: 14, fontWeight: 700 }}>{n}</div><div className="lbl">{t}</div></div></div>
            <div style={{ fontWeight: 800 }}>{c}</div></div>))}
        </div>
      </div>
      <div style={{ maxWidth: 1000, margin: "0 auto 60px", padding: "0 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: -1, marginBottom: 32 }}>Everything in one wallet.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
          {feats.map(([Ic, t, d]) => (<div key={t} className="glass card" style={{ padding: 20 }}>
            <div className="ico" style={{ marginBottom: 12 }}><Ic size={18} /></div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{t}</div><div className="sub" style={{ fontSize: 14, lineHeight: 1.55 }}>{d}</div></div>))}
        </div>
      </div>
      <div style={{ padding: "20px 20px 80px" }}>
        <div className="glass" style={{ maxWidth: 520, margin: "0 auto", padding: "40px 28px", textAlign: "center" }}>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1, marginBottom: 10 }}>Start spending smarter.</div>
          <div className="sub" style={{ marginBottom: 24 }}>Set up your calorie wallet in under 60 seconds.</div>
          <button className="btn" onClick={onStart} style={{ width: "100%", padding: 15 }}>Create my wallet</button>
        </div>
      </div>
    </div>
  );
}

function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [f, setF] = useState({ name: "", gender: "", age: "", height: "", weight: "", activityLevel: 1, goal: "" });
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const profile = { ...f, age: +f.age, height: +f.height, weight: +f.weight, activityLevel: +f.activityLevel };
  const hasBody = f.age && f.height && f.weight && f.gender;
  const bmr = hasBody ? Math.round(calcBMR(profile)) : null;
  const tdee = bmr ? Math.round(calcTDEE(profile)) : null;
  const bmi = hasBody ? calcBMI(profile) : null;
  const target = tdee && f.goal ? calcTarget(profile) : null;
  const canNext = () => step === 1 ? !!f.gender : step === 2 ? f.name && +f.age > 0 && +f.height > 0 && +f.weight > 0 : step === 4 ? !!f.goal : true;
  const finish = () => onComplete({ ...profile, joinDate: new Date().toISOString() });
  const T = ({ t, s }) => (<><h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -.6, marginBottom: 4 }}>{t}</h2><p className="sub" style={{ fontSize: 14, marginBottom: 20 }}>{s}</p></>);

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 460 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div className="row" style={{ justifyContent: "center" }}><Logo /></div>
          <div className="row" style={{ gap: 6, justifyContent: "center", marginTop: 16 }}>
            {[1, 2, 3, 4, 5].map(s => <div key={s} style={{ height: 4, width: 44, borderRadius: 4, background: s <= step ? C.blue : "rgba(14,29,51,.12)", transition: "background .4s" }} />)}
          </div>
          <div className="lbl" style={{ marginTop: 8 }}>Step {step} of 5</div>
        </div>
        <div className="glass rise" style={{ padding: 28, borderRadius: 28 }}>
          {step === 1 && (<div><T t="Biological sex" s="Used for an accurate BMR calculation" />
            <div className="row gap">{["male", "female"].map(g => <button key={g} className={`opt ${f.gender === g ? "on" : ""}`} onClick={() => set("gender", g)} style={{ textAlign: "center", fontWeight: 700, padding: "20px 0", color: f.gender === g ? C.blue : "var(--sub)" }}>{cap(g)}</button>)}</div></div>)}
          {step === 2 && (<div><T t="Your body stats" s="Needed for accurate calorie targets" />
            <div className="col" style={{ gap: 14 }}>
              <Field label="Your name" value={f.name} onChange={v => set("name", v)} placeholder="e.g. Alex" />
              <Field label="Age" value={f.age} onChange={v => set("age", v)} placeholder="e.g. 26" type="number" />
              <Field label="Height (cm)" value={f.height} onChange={v => set("height", v)} placeholder="e.g. 175" type="number" />
              <Field label="Weight (kg)" value={f.weight} onChange={v => set("weight", v)} placeholder="e.g. 72" type="number" /></div>
            {bmi && <div className="glass row between" style={{ marginTop: 16, padding: "12px 16px", borderRadius: 16 }}><span className="sub" style={{ fontSize: 13 }}>Your BMI</span><span style={{ fontSize: 20, fontWeight: 800, color: bmi < 18.5 || (bmi >= 25 && bmi < 30) ? C.amber : bmi < 25 ? "#12a36b" : C.warn }}>{bmi}</span></div>}</div>)}
          {step === 3 && (<div><T t="Activity level" s="How active are you typically?" />
            <div className="col" style={{ gap: 9 }}>{ACTIVITY_LEVELS.map((a, i) => <button key={i} className={`opt ${f.activityLevel == i ? "on" : ""}`} onClick={() => set("activityLevel", i)}>
              <div style={{ fontWeight: 700, fontSize: 14, color: f.activityLevel == i ? C.blue : C.ink }}>{a.label}</div><div className="lbl">{a.desc}</div></button>)}</div></div>)}
          {step === 4 && (<div><T t="Your goal" s="Sets your daily calorie budget" />
            <div className="col" style={{ gap: 10 }}>{[{ id: "cut", label: "Cut", desc: "Lose body fat (–500 cal)", val: tdee && tdee - 500 }, { id: "maintain", label: "Maintain", desc: "Keep current weight", val: tdee }, { id: "bulk", label: "Bulk", desc: "Build muscle (+300 cal)", val: tdee && tdee + 300 }].map(g =>
              <button key={g.id} className={`opt ${f.goal === g.id ? "on" : ""}`} onClick={() => set("goal", g.id)}><div className="row between"><div>
                <div style={{ fontWeight: 700, fontSize: 16, color: f.goal === g.id ? C.blue : C.ink }}>{g.label}</div><div className="lbl">{g.desc}</div></div>
                {g.val && <div style={{ fontWeight: 800, fontSize: 14 }}>{g.val.toLocaleString()} cal</div>}</div></button>)}</div></div>)}
          {step === 5 && (<div>
            <div style={{ textAlign: "center", marginBottom: 20 }}><div className="ico" style={{ margin: "0 auto 12px", width: 48, height: 48, borderRadius: 16 }}><Check size={24} /></div>
              <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -.6 }}>Wallet ready, {f.name}</h2><p className="sub" style={{ fontSize: 14, marginTop: 4 }}>Here is your personalized plan</p></div>
            <div className="col" style={{ gap: 9 }}>{[["Daily Wallet", `${target?.toLocaleString()} credits`, true], ["Base Metabolism (BMR)", `${bmr?.toLocaleString()} cal/day`], ["Total Daily Energy (TDEE)", `${tdee?.toLocaleString()} cal/day`], ["BMI", `${bmi}`], ["Goal", cap(f.goal)]].map(([l, v, big]) =>
              <div key={l} className="glass row between" style={{ padding: "12px 16px", borderRadius: 16 }}><span className="sub" style={{ fontSize: 13 }}>{l}</span><span style={{ fontSize: big ? 20 : 14, fontWeight: 800, color: big ? C.blue : C.ink }}>{v}</span></div>)}</div></div>)}
          <div className="row gap" style={{ marginTop: 24 }}>
            {step > 1 && <button className="btn ghost" onClick={() => setStep(s => s - 1)} style={{ flex: 1 }}>Back</button>}
            <button className="btn" onClick={step === 5 ? finish : () => setStep(s => s + 1)} disabled={!canNext()} style={{ flex: 2 }}>{step === 5 ? "Open my wallet" : "Continue"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ ctx, tab, setTab }) {
  const { profile, stats } = ctx;
  const level = Math.floor(stats.xp / 500) + 1;
  const h = new Date().getHours();
  const tabs = [["overview", Home, "Home"], ["log", Plus, "Log food"], ["analytics", BarChart2, "Analytics"], ["profile", User, "Profile"]];
  return (
    <div style={{ "--sky-ink": ctx.mood > 1.15 ? "#fff" : "#0e1d33" }}>
      <div className="top"><Logo />
        <div className="row" style={{ gap: 6 }}>
          <span className="chip"><Zap size={13} color={C.blue} />{stats.xp.toLocaleString()} XP</span>
          <span className="chip"><Flame size={13} color={C.warn} />{stats.streak}</span>
          <span className="chip">Lv {level}</span></div></div>
      <div className="wrap">
        <div className="row between" style={{ marginBottom: 16 }}>
          <div><div className="lbl skytxt" style={{ opacity: .75 }}>{h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"}</div><div className="h1 skytxt">{profile.name}</div><div className="lbl skytxt" style={{ opacity: .75, marginTop: 2 }}>{skyLabel(ctx.mood)}</div></div>
          <span className="chip"><Target size={13} color={C.blue} />Goal: {cap(profile.goal)}</span></div>
        {tab === "overview" && <OverviewTab ctx={ctx} />}
        {tab === "log" && <LogFoodTab addFood={ctx.addFood} />}
        {tab === "analytics" && <AnalyticsTab ctx={ctx} />}
        {tab === "profile" && <ProfileTab ctx={ctx} />}
      </div>
      <nav className="nav" aria-label="Main">{tabs.map(([id, Ic, l]) => <button key={id} className={tab === id ? "on" : ""} onClick={() => setTab(id)} aria-label={l} title={l}><Ic size={21} /></button>)}</nav>
    </div>
  );
}

function OverviewTab({ ctx }) {
  const { todayLogs, totalSpent, remaining, isOver, dailyTarget, todayWater, addWater, stats, budgetPct, balanceKey, totalProtein, totalCarbs, totalFat, removeFood, profile, addFood, logs } = ctx;
  const pT = Math.round(profile.weight * 2.2), cT = Math.round(dailyTarget * .45 / 4), fT = Math.round(dailyTarget * .25 / 9);
  const numColor = isOver ? "#ffb392" : remaining < dailyTarget * .15 ? "#ffd27a" : "#fff";
  const zoneRef = useRef(null);
  const [drag, setDrag] = useState(null), [hover, setHover] = useState(false), [bursts, setBursts] = useState([]), [gulp, setGulp] = useState(false);
  const tray = useMemo(() => {
    const seen = new Set(), out = [];
    Object.values(logs).flat().sort((a, b) => b.id - a.id).forEach(e => { const f = FOOD_DB.find(x => x.name === e.name); if (f && !seen.has(f.id) && out.length < 8) { seen.add(f.id); out.push(f); } });
    [4, 5, 1, 29, 133, 50, 13, 21].forEach(id => { const f = FOOD_DB.find(x => x.id === id); if (f && !seen.has(id) && out.length < 8) { seen.add(id); out.push(f); } });
    return out;
  }, [logs]);
  const inZone = ev => { const r = zoneRef.current?.getBoundingClientRect(); return !!r && ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom; };
  const burst = (x, y) => { const id = Date.now() + Math.random(); setBursts(b => [...b, { id, x, y }]); setGulp(true); setTimeout(() => setGulp(false), 350); setTimeout(() => setBursts(b => b.filter(q => q.id !== id)), 750); };
  const startDrag = (e, food) => {
    if (e.button !== 0) return;
    setDrag({ food, x: e.clientX, y: e.clientY });
    const move = ev => { setDrag({ food, x: ev.clientX, y: ev.clientY }); setHover(inZone(ev)); };
    const end = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", cancel); setDrag(null); setHover(false); };
    const up = ev => { const hit = inZone(ev); end(); if (hit) { addFood(food, 1); burst(ev.clientX, ev.clientY); } };
    const cancel = () => end();
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", up); window.addEventListener("pointercancel", cancel);
  };
  const keySpend = (e, food) => { if (e.key !== "Enter" && e.key !== " ") return; e.preventDefault(); addFood(food, 1); const r = zoneRef.current.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2); };

  return (
    <div className="col" style={{ gap: 14 }}>
      {drag && <div style={{ position: "fixed", left: drag.x, top: drag.y, transform: "translate(-50%,-50%) scale(1.08)", pointerEvents: "none", zIndex: 500 }} className="glass"><div className="row" style={{ gap: 8, padding: "9px 14px", fontWeight: 700, fontSize: 14 }}><span style={{ fontSize: 20 }}>{drag.food.icon}</span>−{drag.food.calories}</div></div>}
      {bursts.map(b => <span key={b.id}><span className="ring" style={{ left: b.x, top: b.y }} />{Array.from({ length: 12 }, (_, i) => { const a = i * 30 * Math.PI / 180, d = 70 + (i % 3) * 22; return <span key={i} className="pt" style={{ left: b.x, top: b.y, background: ["#fff", "#7ae6ff", "#ffd27a"][i % 3], "--dx": `${Math.cos(a) * d}px`, "--dy": `${Math.sin(a) * d}px` }} />; })}</span>)}
      <div className={`hero ${isOver ? "over pulse" : ""}`}>
        <div className="row between" style={{ position: "relative", zIndex: 1 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: isOver ? "#ffc4ad" : "#bfeaf5" }}>{isOver ? "Wallet overdrawn" : "Daily wallet"}</span>
          <span className="chip">{dailyTarget.toLocaleString()} credits / day</span></div>
        <div ref={zoneRef} className={`zone ${drag ? "drag" : ""} ${hover ? "on" : ""} ${gulp ? "gulp" : ""}`} style={{ position: "relative", zIndex: 1, maxWidth: 300, margin: "8px auto 0", borderRadius: "50%" }}>
          <Orb pct={budgetPct} over={isOver} hover={hover} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div className="big" style={{ fontSize: "clamp(44px,12vw,60px)", color: numColor }}><Odometer value={Math.abs(remaining)} /></div>
            <div style={{ fontSize: 12, marginTop: 8, color: "#e3f8ff", textShadow: "0 1px 8px rgba(0,50,80,.55)" }}>{hover ? "Release to spend" : drag ? "Drop it here" : isOver ? "credits overspent" : "credits remaining"}</div></div></div>
        <div className="row between" style={{ position: "relative", zIndex: 1, fontSize: 13, marginTop: 14, color: isOver ? "#ffc4ad" : "#bfeaf5" }}>
          <span>{totalSpent.toLocaleString()} spent</span><span>{Math.round(budgetPct)}% used</span><span>{isOver ? `${Math.abs(remaining).toLocaleString()} over` : `${remaining.toLocaleString()} left`}</span></div>
        {isOver && <div style={{ position: "relative", zIndex: 1, marginTop: 14, padding: "12px 14px", borderRadius: 16, background: "rgba(255,255,255,.12)", fontSize: 13 }}>
          <div style={{ fontWeight: 700, marginBottom: 2 }}>Overspent by {Math.abs(remaining).toLocaleString()} credits</div>
          <div style={{ color: "#ffd5c4", fontSize: 12, lineHeight: 1.4 }}>Consider a lighter dinner or a 30-min walk to offset the difference.</div></div>}
      </div>
      <div className="glass card">
        <div className="row between" style={{ marginBottom: 12 }}><span style={{ fontWeight: 700, fontSize: 15 }}>Drag to spend</span><span className="lbl">Drop a food on your balance</span></div>
        <div className="row" style={{ flexWrap: "wrap", gap: 8 }}>{tray.map(f => (
          <button key={f.id} className="btn ghost sm ftray" onPointerDown={e => startDrag(e, f)} onKeyDown={e => keySpend(e, f)} aria-label={`Spend ${f.name}, ${f.calories} credits`} style={{ padding: "8px 14px" }}>
            <span style={{ fontSize: 18 }}>{f.icon}</span>{f.name.replace(/\s*\(.*\)/, "")}<span className="lbl">−{f.calories}</span></button>))}</div>
      </div>
      <div className="g3"><Macro label="Protein" val={totalProtein} target={pT} color={C.blue} /><Macro label="Carbs" val={totalCarbs} target={cT} color={C.teal} /><Macro label="Fat" val={totalFat} target={fT} color={C.amber} /></div>
      <div className="g2">
        <div className="glass card">
          <div className="row between" style={{ marginBottom: 10 }}><span className="row" style={{ gap: 7, fontWeight: 700, fontSize: 14 }}><Droplets size={16} color={C.blue} />Water</span>
            <button className="x" onClick={addWater} aria-label="Add a glass of water"><Plus size={14} /></button></div>
          <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 10 }}>{todayWater}<span className="lbl" style={{ marginLeft: 3 }}>/ 8 glasses</span></div>
          <div className="row" style={{ gap: 3 }}>{Array.from({ length: 8 }, (_, i) => <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i < todayWater ? C.blue : "rgba(14,29,51,.09)", transition: "background .3s" }} />)}</div></div>
        <div className="glass card">
          <div className="row" style={{ gap: 7, fontWeight: 700, fontSize: 14, marginBottom: 10 }}><Flame size={16} color={C.warn} />Streak</div>
          <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>{stats.streak}<span className="lbl" style={{ marginLeft: 3 }}>days</span></div>
          <div className="lbl">{stats.streak === 0 ? "Start logging" : stats.streak < 3 ? "Keep it up" : "You are on fire"}</div></div>
      </div>
      <div className="glass" style={{ overflow: "hidden" }}>
        <div className="row between" style={{ padding: "14px 16px 10px" }}><span style={{ fontWeight: 700, fontSize: 15 }}>Today's transactions</span><span className="chip">{todayLogs.length} entries</span></div>
        {todayLogs.length === 0 ? <div className="lbl" style={{ textAlign: "center", padding: "28px 0", fontSize: 14 }}>No meals logged yet. Open Log food to spend your first credits.</div> :
          [...todayLogs].reverse().map(e => (<div key={e.id} className="row rise" style={{ padding: "11px 16px", borderTop: "1px solid rgba(14,29,51,.06)", gap: 12 }}>
            <span style={{ fontSize: 22, minWidth: 30 }}>{e.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 14, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.name}</div>
              <div className="lbl">{e.time} · P {e.protein}g  C {e.carbs}g  F {e.fat}g</div></div>
            <div style={{ fontWeight: 800, fontSize: 15 }}>−{e.calories}</div>
            <button className="x" onClick={() => removeFood(e.id)} aria-label={`Remove ${e.name}`}><X size={13} /></button></div>))}
      </div>
    </div>
  );
}

function LogFoodTab({ addFood }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [servings, setServings] = useState(1);
  const [showCustom, setShowCustom] = useState(false);
  const [custom, setCustom] = useState({ name: "", calories: "", protein: "", carbs: "", fat: "" });
  const [toast, setToast] = useState(null);
  const filtered = useMemo(() => FOOD_DB.filter(f => f.name.toLowerCase().includes(search.toLowerCase())), [search]);
  const sc = (k, v) => setCustom(c => ({ ...c, [k]: v }));
  const showToast = m => { setToast(m); setTimeout(() => setToast(null), 2200); };
  const doAdd = food => { addFood(food, servings); showToast(`${food.name} added`); setSelected(null); setServings(1); };
  const addCustom = () => {
    if (!custom.name || !custom.calories) return;
    addFood({ ...custom, calories: +custom.calories, protein: +custom.protein || 0, carbs: +custom.carbs || 0, fat: +custom.fat || 0, icon: "🍽️" });
    showToast(`${custom.name} added`); setCustom({ name: "", calories: "", protein: "", carbs: "", fat: "" }); setShowCustom(false);
  };
  return (
    <div>
      {toast && <div className="toast">{toast}</div>}
      <Head title="Log food" sub="Search and spend credits on meals" />
      <div style={{ position: "relative", marginBottom: 10 }}>
        <Search size={17} color={C.mute} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${FOOD_DB.length} foods`} style={{ width: "100%", padding: "14px 16px 14px 44px", borderRadius: 999, fontSize: 15 }} /></div>
      <button className="btn ghost" onClick={() => setShowCustom(v => !v)} style={{ width: "100%", marginBottom: 14, fontSize: 14, color: C.blue }}>{showCustom ? "Close custom food" : "Add custom food"}</button>
      {showCustom && <div className="glass rise" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Custom food</div>
        <div className="col" style={{ gap: 9 }}>
          <input value={custom.name} onChange={e => sc("name", e.target.value)} placeholder="Food name (required)" style={{ padding: "12px 14px", borderRadius: 14, fontSize: 14 }} />
          <div className="g2">{[["calories", "Calories (required)"], ["protein", "Protein (g)"], ["carbs", "Carbs (g)"], ["fat", "Fat (g)"]].map(([k, ph]) => <input key={k} value={custom[k]} onChange={e => sc(k, e.target.value)} placeholder={ph} type="number" style={{ padding: "12px 14px", borderRadius: 14, fontSize: 14 }} />)}</div>
          <button className="btn" onClick={addCustom} disabled={!custom.name || !custom.calories}>Add to wallet</button></div></div>}
      <div className="col" style={{ gap: 8 }}>
        {filtered.map(food => (<div key={food.id} className="glass" style={{ padding: "12px 14px", borderRadius: 18, cursor: "pointer", borderColor: selected?.id === food.id ? C.blue : undefined }} onClick={() => { setSelected(selected?.id === food.id ? null : food); setServings(1); }}>
          <div className="row" style={{ gap: 12 }}><span style={{ fontSize: 24 }}>{food.icon}</span>
            <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700 }}>{food.name}</div><div className="lbl">P {food.protein}g  C {food.carbs}g  F {food.fat}g</div></div>
            <div style={{ textAlign: "right" }}><div style={{ fontWeight: 800 }}>−{food.calories}</div><div className="lbl">credits</div></div></div>
          {selected?.id === food.id && <div className="row gap" style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(14,29,51,.07)" }} onClick={e => e.stopPropagation()}>
            <span className="lbl">Servings</span>
            <button className="step" onClick={() => setServings(Math.max(.5, servings - .5))} aria-label="Fewer servings">−</button>
            <span style={{ minWidth: 26, textAlign: "center", fontWeight: 800 }}>{servings}</span>
            <button className="step" onClick={() => setServings(servings + .5)} aria-label="More servings">+</button>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.blue }}>{Math.round(food.calories * servings)} cal</span>
            <button className="btn sm" onClick={() => doAdd(food)} style={{ marginLeft: "auto" }}>Spend</button></div>}
        </div>))}
        {filtered.length === 0 && <div className="lbl" style={{ textAlign: "center", padding: "30px 0", fontSize: 14 }}>No foods match "{search}". Try another word or add a custom food.</div>}
      </div>
    </div>
  );
}

function AnalyticsTab({ ctx }) {
  const { logs, dailyTarget, todayLogs } = ctx;
  const weekData = useMemo(() => Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().split("T")[0];
    return { day: d.toLocaleDateString("en-US", { weekday: "short" }), calories: (logs[key] || []).reduce((s, e) => s + e.calories, 0), key };
  }), [logs]);
  const avg = Math.round(weekData.reduce((s, d) => s + d.calories, 0) / 7);
  const logged = weekData.filter(d => d.calories > 0).length;
  const onT = weekData.filter(d => d.calories > 0 && d.calories <= dailyTarget).length;
  const tot = k => todayLogs.reduce((s, e) => s + (e[k] || 0), 0);
  const totalCals = tot("calories"), P = tot("protein"), Cb = tot("carbs"), F = tot("fat");
  const pc = P * 4, cc = Cb * 4, fc = F * 9, mt = pc + cc + fc || 1;
  return (
    <div>
      <Head title="Analytics" sub="Weekly performance overview" />
      <div className="g3" style={{ marginBottom: 14 }}>{[["7-day average", avg.toLocaleString(), "cal/day", C.blue], ["Days logged", logged, "this week", C.teal], ["On budget", onT, "of 7 days", "#12a36b"]].map(([l, v, u, c]) =>
        <div key={l} className="glass card" style={{ padding: 14, borderRadius: 18 }}><div className="lbl">{l}</div><div style={{ fontSize: 22, fontWeight: 800, color: c, margin: "4px 0 2px" }}>{v}</div><div className="lbl">{u}</div></div>)}</div>
      <div className="glass card" style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, marginBottom: 14 }}>Weekly calories vs budget</div>
        <ResponsiveContainer width="100%" height={170}><BarChart data={weekData} barCategoryGap="25%">
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: C.mute, fontSize: 11 }} /><YAxis hide />
          <Tooltip contentStyle={tip} cursor={{ fill: "rgba(18,169,214,.06)" }} formatter={v => [`${v.toLocaleString()} cal`]} />
          <Bar dataKey="calories" radius={[8, 8, 0, 0]}>{weekData.map((e, i) => <Cell key={i} fill={e.calories > dailyTarget ? C.warn : e.calories > 0 ? C.blue : "rgba(14,29,51,.08)"} />)}</Bar></BarChart></ResponsiveContainer>
        <div className="row" style={{ gap: 16, justifyContent: "center", marginTop: 6 }}>{[[C.blue, "On budget"], [C.warn, "Over budget"]].map(([c, l]) => <div key={l} className="lbl row" style={{ gap: 5 }}><div style={{ width: 9, height: 9, borderRadius: 3, background: c }} />{l}</div>)}</div></div>
      <div className="glass card" style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, marginBottom: 14 }}>Today's macro split</div>
        {totalCals === 0 ? <div className="lbl" style={{ textAlign: "center", padding: "20px 0", fontSize: 13 }}>Log food to see your macro breakdown</div> :
          <div className="col" style={{ gap: 13 }}>{[["Protein", P, pc, C.blue], ["Carbs", Cb, cc, C.teal], ["Fat", F, fc, C.amber]].map(([l, g, c, col]) => { const p = Math.round(c / mt * 100); return (
            <div key={l}><div className="row between" style={{ marginBottom: 5 }}><span className="sub" style={{ fontSize: 13 }}>{l}</span><span style={{ fontSize: 13, fontWeight: 700 }}>{Math.round(g)}g <span style={{ color: col }}>{p}%</span></span></div>
              <div className="bar"><i style={{ width: `${p}%`, background: col }} /></div></div>); })}</div>}</div>
      <div className="glass card">
        <div style={{ fontWeight: 700, marginBottom: 14 }}>This week's trend</div>
        <ResponsiveContainer width="100%" height={150}><AreaChart data={weekData}>
          <defs><linearGradient id="calGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.blue} stopOpacity={.28} /><stop offset="95%" stopColor={C.blue} stopOpacity={0} /></linearGradient></defs>
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: C.mute, fontSize: 11 }} /><YAxis hide />
          <Tooltip contentStyle={tip} cursor={{ stroke: "rgba(18,169,214,.3)" }} formatter={v => [`${v.toLocaleString()} cal`]} />
          <Area type="monotone" dataKey="calories" stroke={C.blue} strokeWidth={2.5} fill="url(#calGrad)" dot={{ fill: C.blue, strokeWidth: 0, r: 3 }} activeDot={{ r: 5, fill: C.blue }} /></AreaChart></ResponsiveContainer></div>
    </div>
  );
}

function ProfileTab({ ctx }) {
  const { profile, stats, dailyTarget } = ctx;
  const bmr = Math.round(calcBMR(profile)), tdee = Math.round(calcTDEE(profile)), bmi = calcBMI(profile);
  const level = Math.floor(stats.xp / 500) + 1, xpIn = stats.xp % 500;
  const earned = BADGES.filter(b => b.check(stats));
  return (
    <div className="col" style={{ gap: 14 }}>
      <Head title="Profile" sub="Your stats and achievements" />
      <div className="hero" style={{ marginTop: -4 }}>
        <div className="row gap" style={{ marginBottom: 16, position: "relative", zIndex: 1 }}>
          <div style={{ width: 52, height: 52, borderRadius: 18, display: "grid", placeItems: "center", fontSize: 22, fontWeight: 800, background: "rgba(255,255,255,.18)" }}>{profile.name?.charAt(0)?.toUpperCase() || "U"}</div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 19, fontWeight: 800 }}>{profile.name}</div><div style={{ fontSize: 12, color: "#bfeaf5" }}>{cap(profile.goal)} · {ACTIVITY_LEVELS[Number(profile.activityLevel)]?.label}</div></div>
          <div style={{ textAlign: "right" }}><div style={{ fontSize: 26, fontWeight: 800 }}>Lv {level}</div><div style={{ fontSize: 11, color: "#bfeaf5" }}>{stats.xp.toLocaleString()} XP</div></div></div>
        <div style={{ position: "relative", zIndex: 1 }}><div className="bar" style={{ background: "rgba(255,255,255,.16)" }}><i style={{ width: `${xpIn / 5}%`, background: "#7ae6ff" }} /></div>
          <div className="row between" style={{ fontSize: 11, color: "#bfeaf5", marginTop: 5 }}><span>{xpIn} / 500 XP</span><span>{500 - xpIn} XP to level {level + 1}</span></div></div></div>
      <div className="g2">{[[Activity, "BMR", bmr.toLocaleString(), "cal/day"], [Zap, "TDEE", tdee.toLocaleString(), "cal/day"], [Wallet, "Daily budget", dailyTarget.toLocaleString(), "credits"], [GaugeIcon, "BMI", bmi, bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese"]].map(([Ic, l, v, u]) =>
        <div key={l} className="glass card"><div className="ico" style={{ marginBottom: 10 }}><Ic size={17} /></div><div className="lbl">{l}</div><div style={{ fontSize: 22, fontWeight: 800, margin: "2px 0" }}>{v}</div><div className="lbl">{u}</div></div>)}</div>
      <div className="glass card">
        <div className="row between" style={{ marginBottom: 14 }}><span style={{ fontWeight: 700, fontSize: 15 }}>Achievements</span><span className="chip">{earned.length}/{BADGES.length}</span></div>
        <div className="g3">{BADGES.map(b => { const ok = b.check(stats); return (
          <div key={b.id} style={{ textAlign: "center", padding: "14px 6px", borderRadius: 16, background: ok ? "rgba(18,169,214,.10)" : "rgba(255,255,255,.35)", border: `1px solid ${ok ? "rgba(18,169,214,.25)" : "rgba(255,255,255,.7)"}`, opacity: ok ? 1 : .55 }}>
            <div className="ico" style={{ margin: "0 auto 7px", background: ok ? C.blue : "rgba(14,29,51,.08)", color: ok ? "#fff" : C.mute }}><b.Icon size={17} /></div>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{b.name}</div><div className="lbl" style={{ fontSize: 10.5, lineHeight: 1.3 }}>{b.desc}</div></div>); })}</div></div>
      <div className="glass card">
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Body info</div>
        {[["Age", `${profile.age} years`], ["Height", `${profile.height} cm`], ["Weight", `${profile.weight} kg`], ["Activity", ACTIVITY_LEVELS[Number(profile.activityLevel)]?.label], ["Gender", cap(profile.gender)], ["Meals logged", `${stats.totalLogs} total`]].map(([k, v], i, a) =>
          <div key={k} className="row between" style={{ padding: "11px 0", borderBottom: i < a.length - 1 ? "1px solid rgba(14,29,51,.07)" : "none" }}><span className="sub" style={{ fontSize: 13 }}>{k}</span><span style={{ fontSize: 13, fontWeight: 700 }}>{v}</span></div>)}</div>
    </div>
  );
}
