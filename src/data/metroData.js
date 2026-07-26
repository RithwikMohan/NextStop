// Complete Indian Metro Data Store for Hyderabad, Delhi, Bengaluru, Mumbai, Chennai & Kolkata

export const CITIES = [
  { id: 'hyderabad', name: 'Hyderabad Metro (HMRL)', state: 'Telangana', active: true, mapFile: '/HMRRouteMap_new.pdf' },
  { id: 'delhi', name: 'Delhi Metro (DMRC)', state: 'Delhi NCR', active: true, mapFile: '/maps/Delhi_Metro_Map.svg' },
  { id: 'bengaluru', name: 'Namma Metro Bengaluru (BMRCL)', state: 'Karnataka', active: true, mapFile: '/maps/Bengaluru_Namma_Metro_Map.svg' },
  { id: 'mumbai', name: 'Mumbai Metro (MMRDA)', state: 'Maharashtra', active: true, mapFile: '/maps/Mumbai_Metro_Map.svg' },
  { id: 'chennai', name: 'Chennai Metro (CMRL)', state: 'Tamil Nadu', active: true, mapFile: '/maps/Chennai_Metro_Map.svg' },
  { id: 'kolkata', name: 'Kolkata Metro (KMRCL)', state: 'West Bengal', active: true, mapFile: '/maps/Kolkata_Metro_Map.svg' },
];

export const METRO_DATA = {
  // 1. HYDERABAD METRO
  hyderabad: {
    cityName: 'Hyderabad',
    systemName: 'Hyderabad Metro Rail',
    lines: [
      {
        id: 'red',
        name: 'Red Line (Line 1)',
        color: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)',
        bgGradient: 'linear-gradient(135deg, #EF4444, #991B1B)',
        terminus: 'Miyapur ↔ LB Nagar',
        totalStations: 27,
        stations: [
          { id: 'hyd_r1', name: 'Miyapur', lat: 17.4967, lng: 78.3614, line: 'red' },
          { id: 'hyd_r2', name: 'JNTU College', lat: 17.4975, lng: 78.3888, line: 'red' },
          { id: 'hyd_r3', name: 'KPHB Colony', lat: 17.4932, lng: 78.3995, line: 'red' },
          { id: 'hyd_r4', name: 'Kukatpally', lat: 17.4842, lng: 78.4116, line: 'red' },
          { id: 'hyd_r5', name: 'Dr. B.R. Ambedkar Balanagar', lat: 17.4727, lng: 78.4239, line: 'red' },
          { id: 'hyd_r6', name: 'Moosapet', lat: 17.4646, lng: 78.4312, line: 'red' },
          { id: 'hyd_r7', name: 'Bharat Nagar', lat: 17.4589, lng: 78.4367, line: 'red' },
          { id: 'hyd_r8', name: 'Erragadda', lat: 17.4518, lng: 78.4418, line: 'red' },
          { id: 'hyd_r9', name: 'ESI Hospital', lat: 17.4444, lng: 78.4468, line: 'red' },
          { id: 'hyd_r10', name: 'SR Nagar', lat: 17.4398, lng: 78.4502, line: 'red' },
          { id: 'hyd_r11', name: 'Ameerpet', lat: 17.4347, lng: 78.4484, line: 'red', isInterchange: true, connectsTo: ['blue'], note: 'Major Hub: Red & Blue Line Interchange' },
          { id: 'hyd_r12', name: 'Punjagutta', lat: 17.4264, lng: 78.4526, line: 'red' },
          { id: 'hyd_r13', name: 'Irrum Manzil', lat: 17.4208, lng: 78.4585, line: 'red' },
          { id: 'hyd_r14', name: 'Khairatabad', lat: 17.4124, lng: 78.4616, line: 'red' },
          { id: 'hyd_r15', name: 'Lakdikapul', lat: 17.4048, lng: 78.4657, line: 'red' },
          { id: 'hyd_r16', name: 'Assembly', lat: 17.3986, lng: 78.4705, line: 'red' },
          { id: 'hyd_r17', name: 'Nampally', lat: 17.3918, lng: 78.4721, line: 'red' },
          { id: 'hyd_r18', name: 'Gandhi Bhavan', lat: 17.3853, lng: 78.4746, line: 'red' },
          { id: 'hyd_r19', name: 'Osmania Medical College', lat: 17.3812, lng: 78.4802, line: 'red' },
          { id: 'hyd_r20', name: 'MG Bus Station (MGBS)', lat: 17.3776, lng: 78.4827, line: 'red', isInterchange: true, connectsTo: ['green'], note: 'Major Hub: Red & Green Line Interchange' },
          { id: 'hyd_r21', name: 'Malakpet', lat: 17.3739, lng: 78.4913, line: 'red' },
          { id: 'hyd_r22', name: 'New Market', lat: 17.3694, lng: 78.4988, line: 'red' },
          { id: 'hyd_r23', name: 'Musarambagh', lat: 17.3662, lng: 78.5064, line: 'red' },
          { id: 'hyd_r24', name: 'Dilsukhnagar', lat: 17.3688, lng: 78.5244, line: 'red' },
          { id: 'hyd_r25', name: 'Chaitanyapuri', lat: 17.3653, lng: 78.5332, line: 'red' },
          { id: 'hyd_r26', name: 'Victoria Memorial', lat: 17.3601, lng: 78.5428, line: 'red' },
          { id: 'hyd_r27', name: 'LB Nagar', lat: 17.3516, lng: 78.5524, line: 'red' },
        ]
      },
      {
        id: 'blue',
        name: 'Blue Line (Line 3)',
        color: '#3B82F6',
        glowColor: 'rgba(59, 130, 246, 0.4)',
        bgGradient: 'linear-gradient(135deg, #3B82F6, #1E40AF)',
        terminus: 'Raidurg ↔ Nagole',
        totalStations: 23,
        stations: [
          { id: 'hyd_b1', name: 'Raidurg', lat: 17.4429, lng: 78.3789, line: 'blue' },
          { id: 'hyd_b2', name: 'HITEC City', lat: 17.4475, lng: 78.3828, line: 'blue' },
          { id: 'hyd_b3', name: 'Durgam Cheruvu', lat: 17.4424, lng: 78.3905, line: 'blue' },
          { id: 'hyd_b4', name: 'Madhapur', lat: 17.4431, lng: 78.3998, line: 'blue' },
          { id: 'hyd_b5', name: 'Peddamma Gudi', lat: 17.4361, lng: 78.4086, line: 'blue' },
          { id: 'hyd_b6', name: 'Jubilee Hills Check Post', lat: 17.4328, lng: 78.4168, line: 'blue' },
          { id: 'hyd_b7', name: 'Road No. 5 Jubilee Hills', lat: 17.4338, lng: 78.4276, line: 'blue' },
          { id: 'hyd_b8', name: 'Yusufguda', lat: 17.4362, lng: 78.4357, line: 'blue' },
          { id: 'hyd_b9', name: 'Madhura Nagar', lat: 17.4358, lng: 78.4419, line: 'blue' },
          { id: 'hyd_b10', name: 'Ameerpet', lat: 17.4347, lng: 78.4484, line: 'blue', isInterchange: true, connectsTo: ['red'], note: 'Major Hub: Blue & Red Line Interchange' },
          { id: 'hyd_b11', name: 'Begumpet', lat: 17.4379, lng: 78.4619, line: 'blue' },
          { id: 'hyd_b12', name: 'Prakash Nagar', lat: 17.4426, lng: 78.4716, line: 'blue' },
          { id: 'hyd_b13', name: 'Rasoolpura', lat: 17.4452, lng: 78.4802, line: 'blue' },
          { id: 'hyd_b14', name: 'Paradise', lat: 17.4421, lng: 78.4883, line: 'blue' },
          { id: 'hyd_b15', name: 'JBS Parade Ground', lat: 17.4439, lng: 78.4975, line: 'blue', isInterchange: true, connectsTo: ['green'], note: 'Blue & Green Line Interchange' },
          { id: 'hyd_b16', name: 'Secunderabad East', lat: 17.4361, lng: 78.5034, line: 'blue' },
          { id: 'hyd_b17', name: 'Mettuguda', lat: 17.4312, lng: 78.5175, line: 'blue' },
          { id: 'hyd_b18', name: 'Tarnaka', lat: 17.4278, lng: 78.5284, line: 'blue' },
          { id: 'hyd_b19', name: 'Habsiguda', lat: 17.4194, lng: 78.5398, line: 'blue' },
          { id: 'hyd_b20', name: 'NGRI', lat: 17.4109, lng: 78.5501, line: 'blue' },
          { id: 'hyd_b21', name: 'Stadium', lat: 17.4042, lng: 78.5562, line: 'blue' },
          { id: 'hyd_b22', name: 'Uppal', lat: 17.3995, lng: 78.5594, line: 'blue' },
          { id: 'hyd_b23', name: 'Nagole', lat: 17.3804, lng: 78.5645, line: 'blue' },
        ]
      },
      {
        id: 'green',
        name: 'Green Line (Line 2)',
        color: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)',
        bgGradient: 'linear-gradient(135deg, #10B981, #065F46)',
        terminus: 'JBS Parade Ground ↔ MGBS',
        totalStations: 9,
        stations: [
          { id: 'hyd_g1', name: 'JBS Parade Ground', lat: 17.4448, lng: 78.4982, line: 'green', isInterchange: true, connectsTo: ['blue'] },
          { id: 'hyd_g2', name: 'Secunderabad West', lat: 17.4358, lng: 78.4998, line: 'green' },
          { id: 'hyd_g3', name: 'Gandhi Hospital', lat: 17.4262, lng: 78.5023, line: 'green' },
          { id: 'hyd_g4', name: 'Musheerabad', lat: 17.4178, lng: 78.4988, line: 'green' },
          { id: 'hyd_g5', name: 'RTC X Roads', lat: 17.4092, lng: 78.4946, line: 'green' },
          { id: 'hyd_g6', name: 'Chikkadpally', lat: 17.4005, lng: 78.4912, line: 'green' },
          { id: 'hyd_g7', name: 'Narayanguda', lat: 17.3932, lng: 78.4876, line: 'green' },
          { id: 'hyd_g8', name: 'Sultan Bazaar', lat: 17.3854, lng: 78.4845, line: 'green' },
          { id: 'hyd_g9', name: 'MG Bus Station (MGBS)', lat: 17.3776, lng: 78.4827, line: 'green', isInterchange: true, connectsTo: ['red'] },
        ]
      }
    ]
  },

  // 2. DELHI METRO (DMRC)
  delhi: {
    cityName: 'Delhi NCR',
    systemName: 'Delhi Metro Rail Corporation',
    lines: [
      {
        id: 'yellow',
        name: 'Yellow Line (Line 2)',
        color: '#EAB308',
        glowColor: 'rgba(234, 179, 8, 0.4)',
        bgGradient: 'linear-gradient(135deg, #EAB308, #854D0E)',
        terminus: 'Samaypur Badli ↔ Millennium City Centre Gurugram',
        totalStations: 37,
        stations: [
          { id: 'del_y1', name: 'Samaypur Badli', lat: 28.7461, lng: 77.1352, line: 'yellow' },
          { id: 'del_y2', name: 'Jahangirpuri', lat: 28.7257, lng: 77.1636, line: 'yellow' },
          { id: 'del_y3', name: 'Azadpur', lat: 28.7067, lng: 77.1802, line: 'yellow' },
          { id: 'del_y4', name: 'Kashmere Gate', lat: 28.6675, lng: 77.2285, line: 'yellow', isInterchange: true, note: 'Red, Yellow & Violet Line Interchange Hub' },
          { id: 'del_y5', name: 'Chandni Chowk', lat: 28.6578, lng: 77.2301, line: 'yellow' },
          { id: 'del_y6', name: 'New Delhi Railway Station', lat: 28.6432, lng: 77.2223, line: 'yellow', isInterchange: true },
          { id: 'del_y7', name: 'Rajiv Chowk (Connaught Place)', lat: 28.6328, lng: 77.2197, line: 'yellow', isInterchange: true, note: 'Yellow & Blue Line Major Central Hub' },
          { id: 'del_y8', name: 'AIIMS', lat: 28.5661, lng: 77.2084, line: 'yellow' },
          { id: 'del_y9', name: 'Hauz Khas', lat: 28.5431, lng: 77.2065, line: 'yellow', isInterchange: true },
          { id: 'del_y10', name: 'Millennium City Centre Gurugram', lat: 28.4593, lng: 77.0726, line: 'yellow' },
        ]
      },
      {
        id: 'blue',
        name: 'Blue Line (Line 3/4)',
        color: '#2563EB',
        glowColor: 'rgba(37, 99, 235, 0.4)',
        bgGradient: 'linear-gradient(135deg, #2563EB, #1E3A8A)',
        terminus: 'Dwarka Sector 21 ↔ Noida Electronic City',
        totalStations: 50,
        stations: [
          { id: 'del_b1', name: 'Dwarka Sector 21', lat: 28.5521, lng: 77.0583, line: 'blue' },
          { id: 'del_b2', name: 'Janakpuri West', lat: 28.6294, lng: 77.0782, line: 'blue', isInterchange: true },
          { id: 'del_b3', name: 'Rajiv Chowk', lat: 28.6328, lng: 77.2197, line: 'blue', isInterchange: true, note: 'Yellow & Blue Line Interchange Hub' },
          { id: 'del_b4', name: 'Mandi House', lat: 28.6258, lng: 77.2341, line: 'blue', isInterchange: true },
          { id: 'del_b5', name: 'Yamuna Bank', lat: 28.6231, lng: 77.2684, line: 'blue' },
          { id: 'del_b6', name: 'Noida City Centre', lat: 28.5747, lng: 77.3561, line: 'blue' },
          { id: 'del_b7', name: 'Noida Electronic City', lat: 28.6277, lng: 77.3736, line: 'blue' },
        ]
      }
    ]
  },

  // 3. BENGALURU METRO (BMRCL - NAMMA METRO)
  bengaluru: {
    cityName: 'Bengaluru',
    systemName: 'Namma Metro Bengaluru',
    lines: [
      {
        id: 'purple',
        name: 'Purple Line',
        color: '#9333EA',
        glowColor: 'rgba(147, 51, 234, 0.4)',
        bgGradient: 'linear-gradient(135deg, #9333EA, #581C87)',
        terminus: 'Whitefield (Kadugodi) ↔ Challaghatta',
        totalStations: 37,
        stations: [
          { id: 'blr_p1', name: 'Whitefield (Kadugodi)', lat: 12.9967, lng: 77.7608, line: 'purple' },
          { id: 'blr_p2', name: 'ITPL', lat: 12.9868, lng: 77.7371, line: 'purple' },
          { id: 'blr_p3', name: 'Krishnarajapura (KR Puram)', lat: 12.9984, lng: 77.6766, line: 'purple' },
          { id: 'blr_p4', name: 'Indiranagar', lat: 12.9783, lng: 77.6387, line: 'purple' },
          { id: 'blr_p5', name: 'MG Road', lat: 12.9756, lng: 77.6067, line: 'purple' },
          { id: 'blr_p6', name: 'Nadaprabhu Kempegowda Station (Majestic)', lat: 12.9757, lng: 77.5728, line: 'purple', isInterchange: true, note: 'Purple & Green Line Hub' },
          { id: 'blr_p7', name: 'Kengeri', lat: 12.9078, lng: 77.4764, line: 'purple' },
          { id: 'blr_p8', name: 'Challaghatta', lat: 12.8942, lng: 77.4619, line: 'purple' },
        ]
      },
      {
        id: 'green',
        name: 'Green Line',
        color: '#16A34A',
        glowColor: 'rgba(22, 163, 74, 0.4)',
        bgGradient: 'linear-gradient(135deg, #16A34A, #14532D)',
        terminus: 'Nagasandra ↔ Silk Institute',
        totalStations: 29,
        stations: [
          { id: 'blr_g1', name: 'Nagasandra', lat: 13.0483, lng: 77.5005, line: 'green' },
          { id: 'blr_g2', name: 'Yeshwanthpur', lat: 13.0234, lng: 77.5498, line: 'green' },
          { id: 'blr_g3', name: 'Majestic', lat: 12.9757, lng: 77.5728, line: 'green', isInterchange: true },
          { id: 'blr_g4', name: 'Jayanagar', lat: 12.9298, lng: 77.5801, line: 'green' },
          { id: 'blr_g5', name: 'Silk Institute', lat: 12.8605, lng: 77.5458, line: 'green' },
        ]
      }
    ]
  },

  // 4. MUMBAI METRO (MMRDA)
  mumbai: {
    cityName: 'Mumbai',
    systemName: 'Mumbai Metro',
    lines: [
      {
        id: 'blue',
        name: 'Line 1 (Versova ↔ Ghatkopar)',
        color: '#0284C7',
        glowColor: 'rgba(2, 132, 199, 0.4)',
        bgGradient: 'linear-gradient(135deg, #0284C7, #075985)',
        terminus: 'Versova ↔ Ghatkopar',
        totalStations: 12,
        stations: [
          { id: 'mum_1', name: 'Versova', lat: 19.1311, lng: 72.8166, line: 'blue' },
          { id: 'mum_2', name: 'DN Nagar', lat: 19.1258, lng: 72.8258, line: 'blue' },
          { id: 'mum_3', name: 'Andheri', lat: 19.1197, lng: 72.8464, line: 'blue', isInterchange: true },
          { id: 'mum_4', name: 'WEH (Western Express Highway)', lat: 19.1158, lng: 72.8564, line: 'blue' },
          { id: 'mum_5', name: 'Airport Road', lat: 19.1118, lng: 72.8732, line: 'blue' },
          { id: 'mum_6', name: 'Saki Naka', lat: 19.1042, lng: 72.8879, line: 'blue' },
          { id: 'mum_7', name: 'Ghatkopar', lat: 19.0858, lng: 72.9084, line: 'blue', isInterchange: true },
        ]
      }
    ]
  },

  // 5. CHENNAI METRO (CMRL)
  chennai: {
    cityName: 'Chennai',
    systemName: 'Chennai Metro Rail (CMRL)',
    lines: [
      {
        id: 'blue',
        name: 'Blue Line (Line 1)',
        color: '#2563EB',
        glowColor: 'rgba(37, 99, 235, 0.4)',
        bgGradient: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
        terminus: 'Wimco Nagar ↔ Chennai Airport',
        totalStations: 25,
        stations: [
          { id: 'che_b1', name: 'Wimco Nagar Depot', lat: 13.1788, lng: 80.3012, line: 'blue' },
          { id: 'che_b2', name: 'Chennai Central', lat: 13.0818, lng: 80.2748, line: 'blue', isInterchange: true },
          { id: 'che_b3', name: 'Government Estate', lat: 13.0674, lng: 80.2741, line: 'blue' },
          { id: 'che_b4', name: 'Teynampet', lat: 13.0418, lng: 80.2482, line: 'blue' },
          { id: 'che_b5', name: 'Guindy', lat: 13.0084, lng: 80.2078, line: 'blue' },
          { id: 'che_b6', name: 'Chennai International Airport', lat: 12.9804, lng: 80.1636, line: 'blue' },
        ]
      }
    ]
  },

  // 6. KOLKATA METRO (KMRCL)
  kolkata: {
    cityName: 'Kolkata',
    systemName: 'Kolkata Metro Rail',
    lines: [
      {
        id: 'blue',
        name: 'Line 1 (North-South)',
        color: '#0284C7',
        glowColor: 'rgba(2, 132, 199, 0.4)',
        bgGradient: 'linear-gradient(135deg, #0284C7, #0369A1)',
        terminus: 'Dakshineswar ↔ Kavi Subhash',
        totalStations: 26,
        stations: [
          { id: 'kol_1', name: 'Dakshineswar', lat: 22.6534, lng: 88.3612, line: 'blue' },
          { id: 'kol_2', name: 'Dum Dum', lat: 22.6212, lng: 88.3789, line: 'blue' },
          { id: 'kol_3', name: 'Shyambazar', lat: 22.6001, lng: 88.3712, line: 'blue' },
          { id: 'kol_4', name: 'Esplanade', lat: 22.5658, lng: 88.3514, line: 'blue', isInterchange: true },
          { id: 'kol_5', name: 'Park Street', lat: 22.5539, lng: 88.3518, line: 'blue' },
          { id: 'kol_6', name: 'Kalighat', lat: 22.5184, lng: 88.3468, line: 'blue' },
          { id: 'kol_7', name: 'Kavi Subhash (New Garia)', lat: 22.4682, lng: 88.3962, line: 'blue' },
        ]
      }
    ]
  }
};

export const DEFAULT_FAVORITES = [
  {
    id: 'fav_1',
    title: 'Work Commute (Hitec City)',
    cityId: 'hyderabad',
    originId: 'Nagole',
    destId: 'HITEC City',
    label: 'Nagole ➔ HITEC City',
    lineColor: '#3B82F6'
  },
  {
    id: 'fav_2',
    title: 'Miyapur to Ameerpet Hub',
    cityId: 'hyderabad',
    originId: 'Miyapur',
    destId: 'Ameerpet',
    label: 'Miyapur ➔ Ameerpet',
    lineColor: '#EF4444'
  },
  {
    id: 'fav_3',
    title: 'Raidurg to Erragadda Express',
    cityId: 'hyderabad',
    originId: 'Raidurg',
    destId: 'Erragadda',
    label: 'Raidurg ➔ Erragadda (🔀 Transfer)',
    lineColor: '#8B5CF6'
  }
];
