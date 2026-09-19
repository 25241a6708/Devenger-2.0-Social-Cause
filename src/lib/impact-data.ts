export type PinCategory = "urgent" | "care" | "environment" | "contributor";

export type ImpactLocation = {
  id: string;
  name: string;
  category: PinCategory;
  type: string;
  detail: string;
  distance: string;
  position: [number, number];
  photo: string;
  action: "Offer Help" | "View Mission";
  stats: { label: string; value: string }[];
};

export const categoryMeta: Record<PinCategory, { label: string; color: string; ring: string; text: string }> = {
  urgent: { label: "Urgent Resource Need", color: "var(--urgent)", ring: "bg-urgent", text: "text-urgent" },
  care: { label: "Orphanage & Care Home", color: "var(--amber)", ring: "bg-amber", text: "text-amber" },
  environment: { label: "Environmental & Community", color: "var(--amber)", ring: "bg-amber", text: "text-amber" },
  contributor: { label: "Verified Contributor", color: "var(--map)", ring: "bg-map", text: "text-map" },
};

export const HYDERABAD: [number, number] = [17.5169, 78.3844];

export const locations: ImpactLocation[] = [
  {
    id: "hope",
    name: "Hope Community Center",
    category: "urgent",
    type: "Community kitchen",
    detail: "30 of 100 meals still needed before 7:00 PM today.",
    distance: "0.4 km",
    position: [17.5169, 78.3844],
    photo: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=60",
    action: "Offer Help",
    stats: [
      { label: "Meals needed", value: "30" },
      { label: "People served", value: "120" },
      { label: "Deadline", value: "5h 20m" },
    ],
  },
  {
    id: "relief-hub",
    name: "City Relief Hub",
    category: "urgent",
    type: "Emergency supply depot",
    detail: "10 units of O+ blood and emergency kits required.",
    distance: "4.8 km",
    position: [17.4938, 78.4012],
    photo: "https://images.unsplash.com/photo-1615461066159-fea0960485d5?auto=format&fit=crop&w=800&q=60",
    action: "View Mission",
    stats: [
      { label: "Blood units", value: "10" },
      { label: "Priority", value: "Critical" },
      { label: "Deadline", value: "2h" },
    ],
  },
  {
    id: "sunshine",
    name: "Sunshine Orphanage",
    category: "care",
    type: "Children's home",
    detail: "Weekend teaching and games volunteers needed for 48 children.",
    distance: "2.6 km",
    position: [17.5312, 78.3702],
    photo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60",
    action: "View Mission",
    stats: [
      { label: "Volunteers", value: "5" },
      { label: "Children", value: "48" },
      { label: "Priority", value: "High" },
    ],
  },
  {
    id: "grace-elders",
    name: "Grace Elders Trust",
    category: "care",
    type: "Senior care home",
    detail: "20 meals and 3 volunteers for evening meal service.",
    distance: "3.9 km",
    position: [17.4995, 78.3585],
    photo: "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=800&q=60",
    action: "Offer Help",
    stats: [
      { label: "Meals", value: "20" },
      { label: "Volunteers", value: "3" },
      { label: "Residents", value: "64" },
    ],
  },
  {
    id: "peace-children",
    name: "Peace Children Home",
    category: "care",
    type: "Residential care",
    detail: "School supplies and mentorship sessions welcome.",
    distance: "5.2 km",
    position: [17.5421, 78.4098],
    photo: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=800&q=60",
    action: "Offer Help",
    stats: [
      { label: "Children", value: "32" },
      { label: "Kits needed", value: "18" },
      { label: "Priority", value: "Medium" },
    ],
  },
  {
    id: "lakes-drive",
    name: "Lakes Cleanliness Drive",
    category: "environment",
    type: "Environmental drive",
    detail: "Shoreline cleanup this Saturday, 6:30 AM start.",
    distance: "6.1 km",
    position: [17.5478, 78.3521],
    photo: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=60",
    action: "View Mission",
    stats: [
      { label: "Volunteers", value: "12" },
      { label: "Area", value: "2.4 km" },
      { label: "When", value: "Saturday" },
    ],
  },
  {
    id: "park-restoration",
    name: "Public Park Restoration",
    category: "environment",
    type: "Community project",
    detail: "Planting, painting and bench repair across 3 blocks.",
    distance: "2.9 km",
    position: [17.5085, 78.3968],
    photo: "https://images.unsplash.com/photo-1444392061186-9fc38f84f726?auto=format&fit=crop&w=800&q=60",
    action: "View Mission",
    stats: [
      { label: "Volunteers", value: "8" },
      { label: "Saplings", value: "60" },
      { label: "Priority", value: "Medium" },
    ],
  },
  {
    id: "green-earth",
    name: "Green Earth Trust",
    category: "environment",
    type: "Environmental NGO",
    detail: "Coordinating the citywide lake and trash cleanup network.",
    distance: "5.7 km",
    position: [17.5602, 78.3812],
    photo: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=60",
    action: "View Mission",
    stats: [
      { label: "Drives", value: "14" },
      { label: "Volunteers", value: "310" },
      { label: "Verified", value: "Yes" },
    ],
  },
  {
    id: "freshbite",
    name: "FreshBite Restaurant",
    category: "contributor",
    type: "Food partner",
    detail: "60 surplus meals available for pickup now.",
    distance: "1.4 km",
    position: [17.5253, 78.3918],
    photo: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=60",
    action: "Offer Help",
    stats: [
      { label: "Meals ready", value: "60" },
      { label: "Pickup", value: "Now" },
      { label: "Rating", value: "4.9" },
    ],
  },
  {
    id: "green-plate",
    name: "Green Plate Kitchen",
    category: "contributor",
    type: "Cloud kitchen",
    detail: "40 meals available, packed and temperature controlled.",
    distance: "3.2 km",
    position: [17.5038, 78.3682],
    photo: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=800&q=60",
    action: "Offer Help",
    stats: [
      { label: "Meals ready", value: "40" },
      { label: "Pickup", value: "30 min" },
      { label: "Rating", value: "4.8" },
    ],
  },
  {
    id: "grocery",
    name: "Local Grocery Network",
    category: "contributor",
    type: "Supply partner",
    detail: "30 dry ration kits available for coordinated dispatch.",
    distance: "2.1 km",
    position: [17.5122, 78.4058],
    photo: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=60",
    action: "Offer Help",
    stats: [
      { label: "Kits", value: "30" },
      { label: "Pickup", value: "1 hr" },
      { label: "Rating", value: "4.6" },
    ],
  },
  {
    id: "blood-bank",
    name: "City Blood Bank",
    category: "contributor",
    type: "Medical partner",
    detail: "Accepting donors for the emergency O+ supply drive.",
    distance: "4.4 km",
    position: [17.4902, 78.3748],
    photo: "https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?auto=format&fit=crop&w=800&q=60",
    action: "View Mission",
    stats: [
      { label: "Donors today", value: "22" },
      { label: "O+ units", value: "6" },
      { label: "Open till", value: "9 PM" },
    ],
  },
];

export type Mission = {
  id: string;
  title: string;
  org: string;
  category: "Food" | "Orphanages" | "Cleaning" | "Blood Donation";
  need: string;
  urgency: "Urgent" | "High Priority" | "This Saturday" | "Ongoing";
  progress: number;
  progressLabel: string;
  deadline: string;
};

export const missions: Mission[] = [
  {
    id: "m1",
    title: "Weekend Volunteer Teaching & Games",
    org: "Sunshine Orphanage",
    category: "Orphanages",
    need: "Needs 5 Volunteers",
    urgency: "High Priority",
    progress: 40,
    progressLabel: "2 / 5 volunteers confirmed",
    deadline: "2 days 6h left",
  },
  {
    id: "m2",
    title: "Local Lake & Trash Cleanup Drive",
    org: "Green Earth Trust",
    category: "Cleaning",
    need: "Needs 12 Volunteers",
    urgency: "This Saturday",
    progress: 58,
    progressLabel: "7 / 12 volunteers confirmed",
    deadline: "4 days 2h left",
  },
  {
    id: "m3",
    title: "Senior Care Assistance & Meal Serving",
    org: "Grace Elders Trust",
    category: "Food",
    need: "Needs 20 Meals + 3 Volunteers",
    urgency: "Ongoing",
    progress: 65,
    progressLabel: "13 / 20 meals pledged",
    deadline: "Today, 8:00 PM",
  },
  {
    id: "m4",
    title: "Blood Donation & Emergency Supply Drive",
    org: "City Relief Hub",
    category: "Blood Donation",
    need: "Needs 10 Units O+ Blood",
    urgency: "Urgent",
    progress: 30,
    progressLabel: "3 / 10 units secured",
    deadline: "2h remaining",
  },
];

export type Contributor = {
  rank: number;
  name: string;
  category: "Restaurant" | "Corporate" | "NGO" | "Individual";
  impact: string;
  points: number;
  badges: string[];
  verified: boolean;
};

export const contributors: Contributor[] = [
  { rank: 1, name: "FreshBite Restaurant", category: "Restaurant", impact: "240 Meals", points: 960, badges: ["Community Food Hero", "Fast Responder"], verified: true },
  { rank: 2, name: "Green Plate Kitchen", category: "Restaurant", impact: "180 Meals", points: 720, badges: ["Community Food Hero"], verified: true },
  { rank: 3, name: "Hyderabad Care Foundation", category: "NGO", impact: "45 Vol Hours", points: 540, badges: ["Care Champion", "Verified Contributor"], verified: true },
  { rank: 4, name: "Local Grocery Network", category: "Corporate", impact: "120 Ration Kits", points: 480, badges: ["Supply Partner"], verified: true },
  { rank: 5, name: "Jashwanth Reddy", category: "Individual", impact: "30 Meals · 12 Hours", points: 380, badges: ["First Responder"], verified: true },
  { rank: 6, name: "Green Earth Trust", category: "NGO", impact: "14 Drives", points: 350, badges: ["Planet Guardian"], verified: true },
  { rank: 7, name: "Priya Sharma", category: "Individual", impact: "22 Vol Hours", points: 290, badges: ["Weekend Warrior"], verified: false },
  { rank: 8, name: "City Blood Bank", category: "Corporate", impact: "64 Donors", points: 260, badges: ["Lifesaver"], verified: true },
];

export const activities = [
  { title: "FreshBite listed 60 surplus meals", meta: "2 min ago · Food partner", tone: "positive" },
  { title: "Hope Community Center updated need", meta: "8 min ago · 30 meals remaining", tone: "urgent" },
  { title: "Priya joined Mission #2048", meta: "14 min ago · Volunteer", tone: "map" },
  { title: "40 meals marked ready for pickup", meta: "22 min ago · Green Plate", tone: "positive" },
  { title: "City Relief Hub raised an SOS", meta: "35 min ago · Blood supply", tone: "urgent" },
];
