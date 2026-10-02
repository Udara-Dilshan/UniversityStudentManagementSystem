import { useEffect, useState, type ReactNode } from "react"
import {
  createBrowserRouter,
  RouterProvider,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router"
import {
  ArrowUpRight,
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Ellipsis,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LifeBuoy,
  Menu,
  MessageSquare,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Upload,
  X,
  Megaphone,
  CheckCircle2,
  PanelLeftClose,
  MapPin,
  Send,
} from "lucide-react"

const courses = [
  {
    name: "Human–Computer Interaction",
    code: "CS 304",
    teacher: "Dr. Sarah Mitchell",
    initials: "SM",
    color: "violet",
    progress: 68,
    mark: "A",
    credits: 3,
    shape: "◎",
  },
  {
    name: "Data Structures & Algorithms",
    code: "CS 201",
    teacher: "Prof. James Wilson",
    initials: "JW",
    color: "blue",
    progress: 52,
    mark: "A−",
    credits: 4,
    shape: "⌘",
  },
  {
    name: "Database Management Systems",
    code: "CS 302",
    teacher: "Dr. Emily Chen",
    initials: "EC",
    color: "green",
    progress: 74,
    mark: "B+",
    credits: 3,
    shape: "▱",
  },
  {
    name: "Software Engineering",
    code: "CS 305",
    teacher: "Prof. Alex Morgan",
    initials: "AM",
    color: "amber",
    progress: 61,
    mark: "A",
    credits: 3,
    shape: "◇",
  },
]
const assignments = [
  {
    title: "User Research & Persona Design",
    course: "Human–Computer Interaction",
    code: "CS 304",
    date: "Today, 11:59 PM",
    tag: "Due today",
    color: "violet",
    points: 100,
  },
  {
    title: "Binary Search Tree Implementation",
    course: "Data Structures & Algorithms",
    code: "CS 201",
    date: "Oct 25, 11:59 PM",
    tag: "In 2 days",
    color: "blue",
    points: 100,
  },
  {
    title: "Database Normalization Report",
    course: "Database Management Systems",
    code: "CS 302",
    date: "Oct 27, 11:59 PM",
    tag: "In 4 days",
    color: "green",
    points: 50,
  },
]
const accents: Record<string, string> = {
  violet: "text-[#b6a4fa] bg-[#a38ae8]/10",
  blue: "text-[#85aff7] bg-[#7da6ec]/10",
  green: "text-[#73cfb2] bg-[#73cfb2]/10",
  amber: "text-[#e5bb79] bg-[#e5bb79]/10",
}
const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "My courses", icon: BookOpen, path: "/courses" },
  { name: "Assignments", icon: FileText, path: "/assignments", badge: "3" },
  { name: "Grades & progress", icon: TrendingUp, path: "/grades" },
  { name: "Timetable", icon: CalendarDays, path: "/timetable" },
  { name: "Attendance", icon: CheckCircle2, path: "/attendance" },
]
function Card({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={`rounded-xl border border-border bg-[#18191f] ${className}`}
    >
      {children}
    </section>
  )
}
function Avatar({
  initials = "AC",
  className = "",
}: {
  initials?: string
  className?: string
}) {
  return (
    <div
      className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#bda387] to-[#655f72] text-xs font-semibold text-white ${className}`}
    >
      {initials}
    </div>
  )
}
function Heading({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <div>
        <h2 className="text-[15px] font-semibold">{title}</h2>
        {subtitle && <p className="mt-1 text-xs text-[#858591]">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
function ViewLink({ to, label = "View all" }: { to: string label?: string }) {
  return (
    <NavLink
      to={to}
      className="flex items-center gap-1.5 text-xs text-[#a6a2bf] transition hover:text-white"
    >
      {label}
      <ArrowRight size={13} />
    </NavLink>
  )
}

function Workspace() {
  const location = useLocation()
  const navigate = useNavigate()
  const [role, setRole] = useState("Student")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [search, setSearch] = useState("")
  const [panel, setPanel] = useState("")
  const [modal, setModal] = useState("")
  const [selected, setSelected] = useState("")
  const [submitted, setSubmitted] = useState<string[]>([])
  const [file, setFile] = useState("")
  const [toast, setToast] = useState("")
  const [read, setRead] = useState(false)
  const [week, setWeek] = useState(0)
  const [filter, setFilter] = useState("All assignments")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<string[]>([])
  const [notifications, setNotifications] = useState(true)
  const [profileName, setProfileName] = useState("Alex Carter")
  const path = location.pathname
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModal("")
        setPanel("")
        setMobileOpen(false)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])
  const lecturer = role === "Lecturer"
  const pageName =
    [
      ...navItems,
      { name: "Announcements", path: "/announcements" },
      { name: "Messages", path: "/messages" },
      { name: "Settings", path: "/settings" },
      { name: "My profile", path: "/profile" },
    ].find((item) => item.path === path)?.name || "Dashboard"
  const notify = (text: string) => {
    setToast(text)
    window.setTimeout(() => setToast(""), 3500)
  }
  const openAssignment = (title: string) => {
    setSelected(title)
    setFile("")
    setModal("assignment")
  }
  const visibleCourses = courses.filter((course) =>
    `${course.name} ${course.code}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )
  const classRows = (
    <div className="space-y-1">
      {[
        {
          time: "09:00",
          end: "10:30 AM",
          name: "Human–Computer Interaction",
          type: "Lecture",
          room: "Building A · Room 204",
          color: "violet",
          active: true,
        },
        {
          time: "11:00",
          end: "12:30 PM",
          name: "Data Structures & Algorithms",
          type: "Lab session",
          room: "CS Lab · Room 102",
          color: "blue",
          active: false,
        },
        {
          time: "14:00",
          end: "03:30 PM",
          name: "Software Engineering",
          type: "Lecture",
          room: "Building B · Room 301",
          color: "amber",
          active: false,
        },
      ].map((item, index) => (
        <div key={item.name} className="relative flex gap-4 py-3.5">
          <div className="w-12 shrink-0 pt-0.5">
            <p className="text-xs font-semibold">{item.time}</p>
            <p className="mt-1 text-[10px] text-[#747480]">{item.end}</p>
          </div>
          <div
            className={`w-0.5 rounded-full ${
              index === 0
                ? "bg-[#a793e7]"
                : index === 1
                  ? "bg-[#7eaae9]"
                  : "bg-[#dcb581]"
            }`}
          />
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-medium">{item.name}</p>
            <p className="mt-1.5 flex items-center gap-1 text-[11px] text-[#878792]">
              <MapPin size={11} />
              {item.room}
            </p>
            <span
              className={`mt-2 inline-block rounded px-1.5 py-0.5 text-[10px] ${accents[item.color]}`}
            >
              {item.type}
            </span>
          </div>
          {item.active && (
            <span className="absolute right-0 top-4 rounded bg-[#77c8a8]/10 px-1.5 py-0.5 text-[9px] text-[#77c8a8]">
              Up next
            </span>
          )}
        </div>
      ))}
    </div>
  )
  const assignmentRows = (full = false) => (
    <div>
      {assignments
        .filter(
          (item) =>
            item.title.toLowerCase().includes(search.toLowerCase()) &&
            (filter !== "Submitted" || submitted.includes(item.title)) &&
            (filter !== "Pending" || !submitted.includes(item.title)),
        )
        .map((item, index) => (
          <button
            key={item.title}
            onClick={() => openAssignment(item.title)}
            className={`group flex w-full items-center gap-3.5 border-border py-4 text-left ${
              index ? "border-t" : ""
            }`}
          >
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${accents[item.color]}`}
            >
              <FileText size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium transition group-hover:text-[#b5a9f3]">
                {item.title}
              </p>
              <p className="mt-1.5 truncate text-[10px] text-[#81818d]">
                {item.code}
                <span className="mx-2 text-[#484852]">/</span>
                {item.course}
              </p>
            </div>
            <div className="text-right">
              <span
                className={`rounded px-2 py-1 text-[10px] ${
                  submitted.includes(item.title)
                    ? "bg-emerald-400/10 text-emerald-300"
                    : index === 0
                      ? "bg-[#d3a566]/10 text-[#e1b676]"
                      : "bg-[#262630] text-[#aaa9b5]"
                }`}
              >
                {submitted.includes(item.title) ? "Submitted" : item.tag}
              </span>
              <p className="mt-2 text-[10px] text-[#81818d]">{item.date}</p>
            </div>
            {full && (
              <ChevronRight
                size={16}
                className="hidden text-[#777782] sm:block"
              />
            )}
          </button>
        ))}
    </div>
  )
  const courseCards = (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {visibleCourses.slice(0, path === "/" ? 3 : 4).map((course, index) => (
        <button
          key={course.code}
          onClick={() => {
            setSelected(course.name)
            setModal("course")
          }}
          className="group overflow-hidden rounded-xl border border-border bg-[#18191f] text-left transition hover:-translate-y-1 hover:border-[#686077]"
        >
          <div
            className={`relative flex h-[100px] items-center overflow-hidden px-5 ${
              index === 0
                ? "bg-gradient-to-r from-[#393049] to-[#24202f]"
                : index === 1
                  ? "bg-gradient-to-r from-[#273347] to-[#1d2532]"
                  : index === 2
                    ? "bg-gradient-to-r from-[#243d38] to-[#1d2d29]"
                    : "bg-[#393026]"
            }`}
          >
            <span className="relative z-10 rounded border border-white/10 bg-black/15 px-2 py-1 text-[10px] text-white/75">
              {course.code}
            </span>
            <div
              className={`absolute -right-1 -top-10 text-[155px] leading-none opacity-30 ${accents[course.color].split(" ")[0]}`}
            >
              {course.shape}
            </div>
            <span className="absolute bottom-3 right-4 text-[9px] text-white/45">
              {course.credits} CREDITS
            </span>
          </div>
          <div className="p-4">
            <h3 className="text-[12px] font-semibold">{course.name}</h3>
            <div className="mt-3 flex items-center gap-2">
              <Avatar
                initials={course.initials}
                className="size-5 text-[8px]"
              />
              <span className="text-[10px] text-[#93939e]">
                {course.teacher}
              </span>
            </div>
            <div className="mb-2 mt-5 flex justify-between text-[10px]">
              <span className="text-[#8c8b99]">Course progress</span>
              <span className="text-[#bcbac8]">{course.progress}%</span>
            </div>
            <div className="h-1 rounded-full bg-[#2c2b36]">
              <div
                className={`h-full rounded-full ${
                  index === 0
                    ? "w-[68%] bg-[#a78bdf]"
                    : index === 1
                      ? "w-[52%] bg-[#82a7df]"
                      : index === 2
                        ? "w-[74%] bg-[#75bda6]"
                        : "w-[61%] bg-[#d0ad77]"
                }`}
              />
            </div>
          </div>
        </button>
      ))}
    </div>
  )
  const announcementContent = (
    <div className="space-y-4">
      {[
        {
          title: "Fall semester exam schedule is live",
          text: "The final examination timetable is now available. Plan ahead and check your schedule.",
          category: "Academic office",
          time: "2 hours ago",
          icon: CalendarDays,
          color: "violet",
        },
        {
          title: "Build something that matters.",
          text: "University Hackathon 2024 registrations are open. Bring your ideas to life, October 28–29.",
          category: "Campus life",
          time: "5 hours ago",
          icon: Sparkles,
          color: "blue",
        },
      ].map((item) => (
        <button
          key={item.title}
          onClick={() => {
            setSelected(item.title)
            setModal("announcement")
          }}
          className="w-full rounded-lg border border-[#2b2935] bg-[#1d1c25] p-4 text-left transition hover:border-[#655675]"
        >
          <div className="flex items-center gap-2">
            <item.icon
              size={13}
              className={accents[item.color].split(" ")[0]}
            />
            <span className="text-[9px] font-medium uppercase tracking-[0.08em] text-[#9e93bc]">
              {item.category}
            </span>
            <span className="ml-auto text-[9px] text-[#777280]">
              {item.time}
            </span>
          </div>
          <h3 className="mt-3 text-[12px] font-medium">{item.title}</h3>
          <p className="mt-2 text-[11px] leading-relaxed text-[#91909d]">
            {item.text}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-[10px] text-[#b1a4d8]">
            Read announcement
            <ArrowUpRight size={12} />
          </span>
        </button>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#101116] text-[#efedf5]">
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-[#25252e] bg-[#15161c] transition-all ${
          collapsed ? "lg:w-20" : "lg:w-[224px]"
        } ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } w-[224px]`}
      >
        <NavLink
          to="/"
          className={`flex h-[78px] items-center gap-2.5 px-6 ${
            collapsed ? "lg:px-5" : ""
          }`}
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-[#b4a0f6] text-[#211a35]">
            <GraduationCap size={22} />
          </div>
          <div className={collapsed ? "lg:hidden" : ""}>
            <span className="text-xl font-bold tracking-[-0.5px]">
              uni<span className="text-[#b4a0f6]">verse</span>
            </span>
            <p className="text-[8px] tracking-[0.14em] text-[#797784]">
              YOUR CAMPUS. CONNECTED.
            </p>
          </div>
        </NavLink>
        <div
          className={`mx-4 mb-7 flex items-center justify-between rounded-lg border border-[#2c2b36] bg-[#1c1d25] px-3 py-2.5 ${
            collapsed ? "lg:hidden" : ""
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded bg-[#282535] text-[#b8a2ea]">
              <GraduationCap size={16} />
            </div>
            <div>
              <p className="text-[11px] font-medium">Westbridge University</p>
              <p className="mt-0.5 text-[9px] text-[#82818e]">
                Student workspace
              </p>
            </div>
          </div>
          <ChevronDown size={12} className="text-[#8a869a]" />
        </div>
        <p
          className={`mb-2 px-7 text-[9px] font-medium uppercase tracking-[0.15em] text-[#6d6c79] ${
            collapsed ? "lg:hidden" : ""
          }`}
        >
          Workspace
        </p>
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                setMobileOpen(false)
                setSearch("")
              }}
              className={({ isActive }) =>
                `flex h-10 items-center gap-3 rounded-lg px-3 text-[12px] transition ${
                  isActive
                    ? "bg-[#a692e5]/12 text-[#c0abff]"
                    : "text-[#94939f] hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <item.icon size={17} />
              <span className={`flex-1 ${collapsed ? "lg:hidden" : ""}`}>
                {item.name}
              </span>
              {item.badge && (
                <span
                  className={`rounded bg-[#3b324d] px-1.5 py-0.5 text-[10px] text-[#c7b2f1] ${
                    collapsed ? "lg:hidden" : ""
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <p
          className={`mb-2 mt-7 px-7 text-[9px] font-medium uppercase tracking-[0.15em] text-[#6d6c79] ${
            collapsed ? "lg:hidden" : ""
          }`}
        >
          Connect
        </p>
        <nav className="space-y-1 px-3">
          {[
            { name: "Announcements", path: "/announcements", icon: Megaphone },
            { name: "Messages", path: "/messages", icon: MessageSquare },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex h-10 items-center gap-3 rounded-lg px-3 text-xs ${
                  isActive
                    ? "bg-[#a692e5]/12 text-[#c0abff]"
                    : "text-[#94939f] hover:bg-white/5"
                }`
              }
            >
              <item.icon size={17} />
              <span className={`flex-1 ${collapsed ? "lg:hidden" : ""}`}>
                {item.name}
              </span>
              {item.name === "Messages" && (
                <span
                  className={`size-1.5 rounded-full bg-[#b4a0f6] ${
                    collapsed ? "lg:hidden" : ""
                  }`}
                />
              )}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto px-3 pb-3 pt-8">
          <div
            className={`mb-5 rounded-xl border border-[#373041] bg-gradient-to-br from-[#252032] to-[#1b1923] p-4 ${
              collapsed ? "lg:hidden" : ""
            }`}
          >
            <Sparkles size={18} className="mb-3 text-[#b8a4e9]" />
            <p className="text-xs font-medium">
              A little help goes a long way.
            </p>
            <p className="mt-2 text-[10px] leading-relaxed text-[#95909f]">
              Your campus support team is here for you.
            </p>
            <button
              onClick={() => setModal("support")}
              className="mt-3 flex items-center gap-2 text-[11px] text-[#c2afea]"
            >
              Get support
              <ArrowUpRight size={13} />
            </button>
          </div>
          <NavLink
            to="/settings"
            className="flex items-center gap-3 px-3 py-3 text-xs text-[#94939f]"
          >
            <Settings size={17} />
            <span className={collapsed ? "lg:hidden" : ""}>Settings</span>
            <button
              aria-label="Collapse sidebar"
              onClick={(event) => {
                event.preventDefault()
                setCollapsed(!collapsed)
              }}
              className="ml-auto hidden lg:block"
            >
              <PanelLeftClose size={14} />
            </button>
          </NavLink>
          <button
            onClick={() => navigate("/profile")}
            className="mt-2 flex w-full items-center gap-2.5 border-t border-[#292833] px-2 pt-4"
          >
            <Avatar />
            <div className={`flex-1 text-left ${collapsed ? "lg:hidden" : ""}`}>
              <p className="text-xs font-medium">{profileName}</p>
              <p className="mt-1 text-[10px] text-[#82808f]">
                {role} · CS undergraduate
              </p>
            </div>
            <Ellipsis size={16} className={collapsed ? "lg:hidden" : ""} />
          </button>
        </div>
      </aside>
      <div
        className={`transition-all ${collapsed ? "lg:ml-20" : "lg:ml-[224px]"}`}
      >
        <header className="sticky top-0 z-30 flex h-[70px] items-center justify-between gap-4 border-b border-[#25252e] bg-[#101116]/95 px-5 backdrop-blur-xl md:px-8">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden"
            >
              <Menu size={20} />
            </button>
            <span className="hidden text-xs text-[#797885] sm:block">
              Workspace
            </span>
            <ChevronRight
              size={12}
              className="hidden text-[#514e5c] sm:block"
            />
            <span className="text-xs text-[#d0ccd9]">{pageName}</span>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative hidden md:block">
              <Search
                size={14}
                className="absolute left-3 top-2.5 text-[#73717f]"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search anything..."
                aria-label="Global search"
                className="h-9 w-[220px] rounded-lg border border-[#2b2933] bg-[#19191f] pl-9 pr-8 text-[11px] placeholder:text-[#777480] focus:border-[#a38adc]"
              />
              <span className="absolute right-2.5 top-2.5 text-[10px] text-[#696574]">
                ⌘ K
              </span>
              {search && path !== "/courses" && path !== "/assignments" && (
                <div className="absolute right-0 top-11 w-80 rounded-xl border border-border bg-[#1e1e27] p-2 shadow-2xl">
                  {[
                    ...courses.map((course) => ({
                      name: course.name,
                      path: "/courses",
                    })),
                    ...assignments.map((item) => ({
                      name: item.title,
                      path: "/assignments",
                    })),
                  ]
                    .filter((item) =>
                      item.name.toLowerCase().includes(search.toLowerCase()),
                    )
                    .map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          navigate(item.path)
                        }}
                        className="block w-full rounded-lg p-3 text-left text-xs hover:bg-white/5"
                      >
                        {item.name}
                        <ArrowUpRight className="float-right" size={13} />
                      </button>
                    ))}
                  {!courses.some((course) =>
                    course.name.toLowerCase().includes(search.toLowerCase()),
                  ) &&
                    !assignments.some((item) =>
                      item.title.toLowerCase().includes(search.toLowerCase()),
                    ) && (
                      <p className="p-3 text-xs text-[#9993a7]">
                        No academic items found.
                      </p>
                    )}
                </div>
              )}
            </div>
            <button
              aria-label="Messages"
              onClick={() => navigate("/messages")}
              className="text-[#a09baa]"
            >
              <MessageSquare size={18} />
            </button>
            <div className="relative">
              <button
                aria-label="Notifications"
                onClick={() =>
                  setPanel(panel === "notifications" ? "" : "notifications")
                }
                className="relative text-[#a09baa]"
              >
                <Bell size={18} />
                {!read && (
                  <span className="absolute -right-0.5 -top-1 size-1.5 rounded-full bg-[#b8a1ee] ring-2 ring-[#101116]" />
                )}
              </button>
              {panel === "notifications" && (
                <div className="absolute right-0 top-9 w-[300px] rounded-xl border border-border bg-[#1e1e27] p-5 shadow-2xl">
                  <Heading
                    title="Notifications"
                    action={
                      <button
                        onClick={() => setRead(true)}
                        className="text-[10px] text-[#ba9ee8]"
                      >
                        Mark all read
                      </button>
                    }
                  />
                  {[
                    "Your HCI assignment is due today.",
                    "New grade posted: Database quiz · 92/100",
                    "Exam timetable is now available.",
                  ].map((text) => (
                    <p
                      key={text}
                      className={`border-t border-border py-3 text-xs ${
                        read ? "text-[#85818e]" : "text-[#d1ccdc]"
                      }`}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <span className="h-6 w-px bg-[#2b2833]" />
            <button
              onClick={() => setPanel(panel === "profile" ? "" : "profile")}
              className="flex items-center gap-2"
            >
              <Avatar className="size-8" />
              <ChevronDown size={12} className="text-[#8b8695]" />
            </button>
            {panel === "profile" && (
              <div className="absolute right-7 top-16 w-48 rounded-xl border border-border bg-[#1e1e27] p-2 shadow-xl">
                <button
                  onClick={() => {
                    navigate("/profile")
                    setPanel("")
                  }}
                  className="w-full rounded p-3 text-left text-xs hover:bg-white/5"
                >
                  My profile
                </button>
                <button
                  onClick={() => {
                    setRole(lecturer ? "Student" : "Lecturer")
                    setPanel("")
                    notify(
                      `Switched to ${
                        lecturer ? "student" : "lecturer"
                      } workspace`,
                    )
                  }}
                  className="w-full rounded p-3 text-left text-xs hover:bg-white/5"
                >
                  Switch to {lecturer ? "Student" : "Lecturer"}
                </button>
                <button
                  onClick={() => {
                    navigate("/settings")
                    setPanel("")
                  }}
                  className="w-full rounded p-3 text-left text-xs hover:bg-white/5"
                >
                  Account settings
                </button>
              </div>
            )}
          </div>
        </header>
        <main className="mx-auto max-w-[1600px] px-5 pb-24 pt-7 md:px-8 lg:pb-8">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[10px] text-[#9992a6]">
                <span className="size-1.5 rounded-full bg-[#b49ae9]" />
                FALL SEMESTER 2024<span className="mx-1 text-[#47414f]">/</span>
                WEEK 08
              </div>
              <h1 className="text-[27px] font-semibold tracking-[-0.6px]">
                {path === "/"
                  ? `Good morning, ${profileName.split(" ")[0]}`
                  : pageName}
                {path === "/" && <span className="ml-2 text-[25px]">✦</span>}
              </h1>
              <p className="mt-1.5 text-xs text-[#92909d]">
                {path === "/"
                  ? lecturer
                    ? "Here's what's happening across your teaching workspace today."
                    : "Let's make today a productive one. Here's your academic overview."
                  : "Everything you need, right where you need it."}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 rounded-lg border border-border bg-[#19191f] px-3 py-2.5 text-[11px] text-[#bcb7c7]">
                <CalendarDays size={14} />
                Wed, Oct 23, 2024
              </span>
              <button
                onClick={() => setModal("quick")}
                className="flex items-center gap-2 rounded-lg bg-[#b7a1ee] px-3 py-2.5 text-[11px] font-semibold text-[#261d38] transition hover:bg-[#c7b4fb]"
              >
                <Plus size={15} />
                Quick action
              </button>
            </div>
          </div>
          {path === "/" && (
            <>
              <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    label: lecturer ? "Teaching courses" : "Enrolled courses",
                    value: "06",
                    detail: "18 total credit hours",
                    icon: BookOpen,
                    change: "This semester",
                    color: "violet",
                  },
                  {
                    label: lecturer
                      ? "Pending grading"
                      : "Current semester GPA",
                    value: lecturer ? "24" : "3.86",
                    detail: lecturer ? "Across 3 assignments" : "out of 4.00",
                    icon: TrendingUp,
                    change: lecturer
                      ? "8 new submissions"
                      : "+0.12 from last semester",
                    color: "green",
                  },
                  {
                    label: "Overall attendance",
                    value: "94.2",
                    suffix: "%",
                    detail: "Looking good. Keep it up!",
                    icon: CheckCircle2,
                    change: "Above 85% requirement",
                    color: "blue",
                  },
                  {
                    label: "Upcoming deadlines",
                    value: "03",
                    detail: "1 assignment due today",
                    icon: Clock3,
                    change: "Stay ahead of the curve",
                    color: "amber",
                  },
                ].map((metric, index) => (
                  <Card
                    key={metric.label}
                    className={`relative overflow-hidden p-4 ${
                      index === 1
                        ? "border-[#41354f] bg-gradient-to-br from-[#24202e] to-[#1a1922]"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#aaa5b6]">
                        {metric.label}
                      </span>
                      <div
                        className={`rounded-lg p-2 ${accents[metric.color]}`}
                      >
                        <metric.icon size={16} />
                      </div>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-[31px] font-semibold tracking-[-0.5px]">
                        {metric.value}
                      </span>
                      <span className="text-lg text-[#b0a7bc]">
                        {metric.suffix}
                      </span>
                      {index === 1 && (
                        <span className="ml-2 text-[10px] text-[#82778e]">
                          {metric.detail}
                        </span>
                      )}
                    </div>
                    {index !== 1 && (
                      <p className="mt-1 text-[10px] text-[#8c8696]">
                        {metric.detail}
                      </p>
                    )}
                    <p
                      className={`mt-4 flex items-center gap-1 text-[9px] ${
                        index === 1 ? "text-[#8fc7aa]" : "text-[#85808f]"
                      }`}
                    >
                      {index === 1 ? (
                        <TrendingUp size={12} />
                      ) : (
                        <span
                          className={`size-1 rounded-full ${
                            index === 3 ? "bg-[#d9b57b]" : "bg-[#8e869b]"
                          }`}
                        />
                      )}{" "}
                      {metric.change}
                    </p>
                  </Card>
                ))}
              </div>
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_310px] 2xl:grid-cols-[minmax(0,1fr)_350px]">
                <div className="space-y-6">
                  <Card className="px-5 pb-1 pt-5">
                    <Heading
                      title={
                        lecturer
                          ? "Assignments to review"
                          : "Upcoming assignments"
                      }
                      subtitle="A little progress each day adds up."
                      action={<ViewLink to="/assignments" />}
                    />
                    {assignmentRows()}
                  </Card>
                  <section>
                    <Heading
                      title={lecturer ? "Your teaching courses" : "My courses"}
                      subtitle="Pick up where you left off."
                      action={<ViewLink to="/courses" label="All courses" />}
                    />
                    {courseCards}
                  </section>
                  <Card className="p-5">
                    <Heading
                      title="Academic performance"
                      subtitle="Small steps. Steady growth."
                      action={
                        <select
                          aria-label="Performance period"
                          className="rounded-md border border-border bg-[#202029] px-2 py-1 text-[10px]"
                        >
                          <option>This semester</option>
                          <option>Last semester</option>
                        </select>
                      }
                    />
                    <div className="flex items-start gap-6">
                      <div className="w-[80px] shrink-0 pt-4">
                        <p className="text-[26px] font-semibold">3.86</p>
                        <p className="mt-1 text-[10px] text-[#9892a4]">
                          Semester GPA
                        </p>
                        <span className="mt-3 flex items-center gap-1 text-[10px] text-[#8bc2a5]">
                          <TrendingUp size={12} />
                          +3.2%
                        </span>
                      </div>
                      <div className="flex flex-1 gap-3">
                        <div className="flex h-[108px] flex-col justify-between text-[9px] text-[#6e687b]">
                          <span>4.0</span>
                          <span>3.0</span>
                          <span>2.0</span>
                        </div>
                        <div className="relative flex flex-1 items-end justify-around gap-3 border-b border-[#34303e] pb-0">
                          <div className="absolute inset-x-0 top-0 border-t border-dashed border-[#2c2935]" />
                          <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-[#2c2935]" />
                          {[
                            "h-[58px]",
                            "h-[71px]",
                            "h-[66px]",
                            "h-[82px]",
                            "h-[88px]",
                            "h-[99px]",
                          ].map((height, index) => (
                            <div
                              key={height}
                              className="relative z-10 flex w-full max-w-9 flex-col items-center"
                            >
                              <div
                                className={`w-full rounded-t bg-gradient-to-t ${
                                  index === 5
                                    ? "from-[#8c71c2] to-[#c1a2f7]"
                                    : "from-[#454051] to-[#72637f]"
                                } ${height}`}
                              />
                              <span className="absolute -bottom-5 text-[9px] text-[#827a90]">
                                {
                                  ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"][
                                    index
                                  ]
                                }
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-9 flex items-center gap-1.5 border-t border-border pt-3 text-[10px] text-[#8b839b]">
                      <span className="size-1.5 rounded-full bg-[#b59bea]" />
                      Your performance is in the top 12% of your department.
                      <Sparkles size={12} className="ml-auto text-[#b49add]" />
                    </div>
                  </Card>
                </div>
                <div className="space-y-6">
                  <Card className="p-5">
                    <Heading
                      title="Today's classes"
                      action={<ViewLink to="/timetable" label="Timetable" />}
                    />
                    <div className="flex items-center gap-2 border-b border-border pb-3 text-[10px] text-[#96909f]">
                      <CalendarDays size={13} />
                      Wednesday, October 23
                      <span className="ml-auto rounded bg-[#292532] px-1.5 py-1 text-[9px] text-[#afa0c5]">
                        3 classes
                      </span>
                    </div>
                    {classRows}
                    <NavLink
                      to="/timetable"
                      className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-[#34303d] py-2.5 text-[10px] text-[#bbb0cd]"
                    >
                      View full schedule
                      <ArrowRight size={12} />
                    </NavLink>
                  </Card>
                  <Card className="p-5">
                    <Heading
                      title="Campus updates"
                      action={<ViewLink to="/announcements" />}
                    />
                    {announcementContent}
                  </Card>
                  <div className="flex items-center gap-3 rounded-xl border border-[#34313e] bg-gradient-to-r from-[#272231] to-[#1b1b22] p-4">
                    <div className="flex size-9 items-center justify-center rounded-full bg-[#a38cda]/10 text-[#ba9fef]">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium">
                        You're right on track.
                      </p>
                      <p className="mt-1 text-[10px] text-[#94879f]">
                        Every day is a step toward your future.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {path === "/courses" && (
            <>
              <div className="mb-6 flex gap-3 text-xs">
                <span className="rounded-lg bg-[#a892e6]/15 px-4 py-2 text-[#c3adef]">
                  Enrolled courses · 6
                </span>
                <span className="px-4 py-2 text-[#96909f]">
                  Fall semester 2024
                </span>
              </div>
              {courseCards}
            </>
          )}
          {path === "/assignments" && (
            <Card className="p-5">
              <Heading
                title={lecturer ? "Assignment management" : "Your assignments"}
                action={
                  <div className="flex gap-2">
                    <select
                      aria-label="Filter assignments"
                      value={filter}
                      onChange={(event) => setFilter(event.target.value)}
                      className="rounded-lg border border-border bg-[#22212b] p-2 text-xs"
                    >
                      {["All assignments", "Pending", "Submitted"].map(
                        (value) => (
                          <option key={value}>{value}</option>
                        ),
                      )}
                    </select>
                    {lecturer && (
                      <button
                        onClick={() => setModal("create")}
                        className="rounded-lg bg-[#b6a0e9] px-3 text-xs text-[#241b36]"
                      >
                        Create assignment
                      </button>
                    )}
                  </div>
                }
              />
              {assignmentRows(true)}
              {filter === "Submitted" && submitted.length === 0 && (
                <p className="py-12 text-center text-sm text-[#93889e]">
                  Your submitted assignments will appear here.
                </p>
              )}
            </Card>
          )}
          {path === "/grades" && (
            <div className="grid gap-5 md:grid-cols-[250px_1fr]">
              <Card className="p-7">
                <TrendingUp className="text-[#bda3ef]" />
                <p className="mt-5 text-xs text-[#a599b4]">Cumulative GPA</p>
                <p className="mt-2 text-5xl font-semibold">
                  3.86<span className="text-lg text-[#81758f]"> / 4.0</span>
                </p>
                <p className="mt-5 text-xs text-[#89c4aa]">
                  ↑ 0.12 from last semester
                </p>
                <p className="mt-10 text-sm">Dean's List standing</p>
                <p className="mt-2 text-xs leading-relaxed text-[#a398b1]">
                  Excellent work. You're in the top 12% of your department.
                </p>
              </Card>
              <Card className="p-5">
                <Heading title="Course-by-course performance" />
                {courses.map((course) => (
                  <div
                    key={course.code}
                    className="flex items-center gap-4 border-t border-border py-5"
                  >
                    <div className={`rounded-lg p-3 ${accents[course.color]}`}>
                      <BookOpen size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{course.name}</p>
                      <p className="mt-1 text-xs text-[#91859f]">
                        {course.code} · {course.credits} credits
                      </p>
                    </div>
                    <span className="rounded-lg bg-[#78bf9d]/10 px-4 py-2 text-lg text-[#8bceb0]">
                      {course.mark}
                    </span>
                  </div>
                ))}
              </Card>
            </div>
          )}
          {path === "/timetable" && (
            <Card className="p-5">
              <Heading
                title={`Weekly schedule · October ${21 + week * 7}–${25 + week * 7}`}
                action={
                  <div className="flex items-center gap-3">
                    <button
                      aria-label="Previous week"
                      onClick={() => setWeek(week - 1)}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setWeek(0)}
                      className="text-xs text-[#bea5ed]"
                    >
                      This week
                    </button>
                    <button
                      aria-label="Next week"
                      onClick={() => setWeek(week + 1)}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                }
              />
              <div className="grid gap-4 md:grid-cols-5">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                  (day, index) => (
                    <div
                      key={day}
                      className={`rounded-lg border p-3 ${
                        index === 2
                          ? "border-[#74608e] bg-[#211d2a]"
                          : "border-border"
                      }`}
                    >
                      <p className="mb-5 text-xs text-[#bfa9d8]">
                        {day} · {21 + index + week * 7}
                      </p>
                      {index === 2 ? (
                        classRows
                      ) : (
                        <div className="space-y-5">
                          {courses
                            .slice(index % 2, (index % 2) + 2)
                            .map((course, courseIndex) => (
                              <button
                                key={course.code}
                                onClick={() => {
                                  setSelected(course.name)
                                  setModal("course")
                                }}
                                className={`w-full rounded-lg p-3 text-left ${accents[course.color]}`}
                              >
                                <p className="text-[10px]">
                                  {courseIndex === 0
                                    ? "09:00 – 10:30"
                                    : "14:00 – 15:30"}
                                </p>
                                <p className="mt-3 text-xs leading-relaxed">
                                  {course.name}
                                </p>
                                <p className="mt-3 text-[10px] opacity-70">
                                  Room {204 + index}
                                </p>
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                  ),
                )}
              </div>
            </Card>
          )}
          {path === "/attendance" && (
            <Card className="p-6">
              <Heading
                title="Attendance overview"
                subtitle="You're above the 85% attendance requirement in every course."
              />
              {courses.map((course, index) => (
                <div
                  key={course.code}
                  className="flex flex-wrap items-center gap-5 border-t border-border py-6"
                >
                  <div className="min-w-52 flex-1">
                    <p className="text-sm">{course.name}</p>
                    <p className="mt-1 text-xs text-[#94889f]">
                      {24 - index} of {25 - index} classes attended
                    </p>
                  </div>
                  <div className="h-2 w-48 rounded-full bg-[#2f2937]">
                    <div
                      className={`h-2 rounded-full bg-[#8cc9af] ${
                        index === 0
                          ? "w-[96%]"
                          : index === 1
                            ? "w-[92%]"
                            : "w-[94%]"
                      }`}
                    />
                  </div>
                  <span className="text-sm text-[#8dc9b0]">
                    {[96, 92, 94, 95][index]}%
                  </span>
                  {lecturer && (
                    <button
                      onClick={() => {
                        setSelected(course.name)
                        setModal("attendance")
                      }}
                      className="rounded border border-border px-3 py-2 text-xs"
                    >
                      Take attendance
                    </button>
                  )}
                </div>
              ))}
            </Card>
          )}
          {path === "/announcements" && (
            <div className="max-w-3xl">
              <Heading
                title="Latest from your campus"
                action={
                  lecturer && (
                    <button
                      onClick={() => setModal("create")}
                      className="rounded-lg bg-[#b6a0e9] px-3 py-2 text-xs text-[#241b36]"
                    >
                      Publish announcement
                    </button>
                  )
                }
              />
              {announcementContent}
            </div>
          )}
          {path === "/messages" && (
            <Card className="grid min-h-[500px] overflow-hidden md:grid-cols-[250px_1fr]">
              <div className="border-b border-border p-5 md:border-b-0 md:border-r">
                <Heading title="Messages" />
                {courses.slice(0, 3).map((course) => (
                  <button
                    key={course.code}
                    onClick={() => setSelected(course.teacher)}
                    className={`mb-2 flex w-full items-center gap-3 rounded-lg p-3 text-left ${
                      selected === course.teacher ||
                      (!selected && course.code === "CS 304")
                        ? "bg-[#2e263d]"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <Avatar initials={course.initials} />
                    <div>
                      <p className="text-xs">{course.teacher}</p>
                      <p className="mt-1 text-[10px] text-[#95899e]">
                        {course.code} · Lecturer
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex flex-col p-5">
                <Heading
                  title={
                    selected.startsWith("Dr.") || selected.startsWith("Prof.")
                      ? selected
                      : "Dr. Sarah Mitchell"
                  }
                  subtitle="Usually replies within a few hours"
                />
                <div className="flex-1 space-y-4 border-t border-border pt-6">
                  <p className="max-w-sm rounded-xl rounded-tl-none bg-[#282231] p-4 text-xs leading-relaxed">
                    Hi Alex! If you have any questions about the user research
                    assignment, feel free to reach out. Office hours are
                    Thursday, 2–4 PM.
                  </p>
                  {messages.map((text, index) => (
                    <p
                      key={index}
                      className="ml-auto max-w-sm rounded-xl rounded-tr-none bg-[#53416f] p-4 text-xs leading-relaxed"
                    >
                      {text}
                    </p>
                  ))}
                </div>
                <form
                  onSubmit={(event) => {
                    event.preventDefault()
                    if (message.trim()) {
                      setMessages([...messages, message])
                      setMessage("")
                    }
                  }}
                  className="mt-6 flex gap-2"
                >
                  <input
                    aria-label="Message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Write a message..."
                    className="flex-1 rounded-lg border border-border bg-[#201c28] px-4 py-3 text-xs"
                  />
                  <button
                    aria-label="Send message"
                    className="rounded-lg bg-[#b69bea] px-4 text-[#21162e]"
                  >
                    <Send size={17} />
                  </button>
                </form>
              </div>
            </Card>
          )}
          {(path === "/profile" || path === "/settings") && (
            <Card className="max-w-2xl p-6">
              <Heading
                title={
                  path === "/profile"
                    ? "Personal & academic information"
                    : "Workspace preferences"
                }
              />
              <div className="mb-7 flex items-center gap-4">
                <Avatar className="size-16 text-xl" />
                <div>
                  <p className="font-medium">{profileName}</p>
                  <p className="mt-1 text-xs text-[#988ca5]">
                    Computer Science · Class of 2026
                  </p>
                </div>
              </div>
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  notify("Your changes have been saved.")
                }}
                className="space-y-5"
              >
                <label className="block text-xs text-[#a99bb7]">
                  Full name
                  <input
                    value={profileName}
                    onChange={(event) => setProfileName(event.target.value)}
                    className="mt-2 block w-full rounded-lg border border-border bg-[#211c29] px-3 py-3 text-sm text-white"
                    required
                  />
                </label>
                <label className="block text-xs text-[#a99bb7]">
                  University email
                  <input
                    defaultValue="alex.carter@westbridge.edu"
                    type="email"
                    className="mt-2 block w-full rounded-lg border border-border bg-[#211c29] px-3 py-3 text-sm text-white"
                    required
                  />
                </label>
                <div className="flex items-center justify-between border-y border-border py-5">
                  <span className="text-xs">Email notifications</span>
                  <button
                    type="button"
                    aria-label="Toggle email notifications"
                    aria-pressed={notifications}
                    onClick={() => setNotifications(!notifications)}
                    className={`flex h-6 w-11 items-center rounded-full px-1 ${
                      notifications
                        ? "justify-end bg-[#ac90df]"
                        : "justify-start bg-[#494151]"
                    }`}
                  >
                    <span className="size-4 rounded-full bg-white" />
                  </button>
                </div>
                <label className="block text-xs text-[#a99bb7]">
                  Workspace role
                  <select
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    className="ml-4 rounded-lg border border-border bg-[#211c29] p-2 text-white"
                  >
                    <option>Student</option>
                    <option>Lecturer</option>
                  </select>
                </label>
                <button className="rounded-lg bg-[#bba3ef] px-5 py-3 text-xs font-medium text-[#23172f]">
                  Save changes
                </button>
              </form>
            </Card>
          )}
          <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#24212b] pt-5 text-[9px] text-[#686471]">
            <span>© 2024 Universe · Westbridge University</span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#81b89a]" />
              All systems operational<span className="mx-2">·</span>
              <button onClick={() => setModal("support")}>
                Help & support
                <ArrowUpRight size={10} className="ml-1 inline" />
              </button>
            </span>
          </footer>
        </main>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-border bg-[#17151e]/95 py-3 backdrop-blur-lg lg:hidden">
        {navItems.slice(0, 5).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1.5 text-[8px] ${
                isActive ? "text-[#c5a8fa]" : "text-[#8d829b]"
              }`
            }
          >
            <item.icon size={19} />
            {item.name.split(" ")[0]}
          </NavLink>
        ))}
      </nav>
      {toast && (
        <div
          role="status"
          className="fixed bottom-24 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-xl border border-[#5c4b73] bg-[#292132] px-5 py-4 text-xs shadow-2xl lg:bottom-8"
        >
          <Check size={15} className="text-[#9dd5b6]" />
          {toast}
        </div>
      )}
      {modal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
          onClick={() => setModal("")}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label={modal}
            className="relative max-h-[85vh] w-full max-w-lg overflow-auto rounded-2xl border border-[#45384f] bg-[#1c1824] p-7 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Close dialog"
              onClick={() => setModal("")}
              className="absolute right-5 top-5 text-[#a898b4]"
            >
              <X size={19} />
            </button>
            {modal === "assignment" && (
              <>
                <span className="text-[10px] uppercase tracking-widest text-[#ba9cdd]">
                  Assignment · CS 304
                </span>
                <h2 className="mb-4 mt-3 pr-5 text-xl font-semibold">
                  {selected}
                </h2>
                <p className="text-xs leading-relaxed text-[#a99bb5]">
                  Complete the coursework and upload your submission as a PDF or
                  ZIP file. Include your student ID and references in your
                  document.
                </p>
                <div className="my-5 flex gap-5 rounded-lg bg-[#2b2334] p-3 text-xs">
                  <span>
                    Due:{" "}
                    {assignments.find((item) => item.title === selected)?.date}
                  </span>
                  <span>
                    {
                      assignments.find((item) => item.title === selected)
                        ?.points
                    }{" "}
                    points
                  </span>
                </div>
                {submitted.includes(selected) ? (
                  <div className="rounded-lg bg-emerald-400/10 p-5 text-sm text-emerald-300">
                    <CheckCheck className="mb-2" />
                    Your assignment has been submitted successfully.
                  </div>
                ) : lecturer ? (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault()
                      notify("Grade saved and student notified.")
                      setModal("")
                    }}
                    className="space-y-4"
                  >
                    <label className="text-xs">
                      Grade
                      <input
                        required
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Score out of 100"
                        className="mt-2 w-full rounded-lg border border-border bg-[#282030] p-3"
                      />
                    </label>
                    <textarea
                      placeholder="Feedback for student"
                      className="w-full rounded-lg border border-border bg-[#282030] p-3 text-xs"
                    />
                    <button className="w-full rounded-lg bg-[#b79be9] p-3 text-xs font-semibold text-[#241831]">
                      Save grade
                    </button>
                  </form>
                ) : (
                  <>
                    <label className="flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-[#6a527e] p-7 text-xs text-[#bca7d1]">
                      <Upload size={26} className="mb-3" />
                      {file || "Choose a PDF or ZIP file"}
                      <input
                        type="file"
                        accept=".pdf,.zip,.doc,.docx"
                        className="mt-4 max-w-full text-[10px]"
                        onChange={(event) =>
                          setFile(event.target.files?.[0]?.name || "")
                        }
                      />
                    </label>
                    <button
                      disabled={!file}
                      onClick={() => {
                        setSubmitted([...submitted, selected])
                        notify("Assignment submitted successfully.")
                      }}
                      className="mt-5 w-full rounded-lg bg-[#b79be9] p-3 text-xs font-semibold text-[#241831] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Submit assignment
                    </button>
                    <p className="mt-3 text-center text-[10px] text-[#80728e]">
                      Demo workspace · Files are not uploaded to a server.
                    </p>
                  </>
                )}
              </>
            )}
            {modal === "course" && (
              <>
                <span className="text-xs text-[#bda0e7]">Course overview</span>
                <h2 className="mt-3 text-xl font-semibold">{selected}</h2>
                <p className="mt-3 text-xs text-[#ad9dba]">
                  {courses.find((course) => course.name === selected)?.teacher}{" "}
                  · Fall semester 2024
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    "Week 08 · Lecture notes",
                    "Course syllabus & reading list",
                    "Project guidelines",
                  ].map((resource) => (
                    <button
                      key={resource}
                      onClick={() => {
                        const blob = new Blob(
                          [
                            `${selected}\n${resource}\n\nWelcome to your course resource. This is a demonstration document.`,
                          ],
                          { type: "text/plain" },
                        )
                        const url = URL.createObjectURL(blob)
                        const anchor = document.createElement("a")
                        anchor.href = url
                        anchor.download = `${resource}.txt`
                        anchor.click()
                        URL.revokeObjectURL(url)
                        notify("Course resource downloaded.")
                      }}
                      className="flex w-full items-center gap-3 rounded-lg bg-[#2b2334] p-4 text-xs"
                    >
                      <FileText size={16} />
                      {resource}
                      <Download size={14} className="ml-auto" />
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    navigate("/assignments")
                    setModal("")
                  }}
                  className="mt-6 w-full rounded-lg bg-[#b79be9] p-3 text-xs text-[#251a33]"
                >
                  View course assignments
                </button>
              </>
            )}
            {modal === "announcement" && (
              <>
                <span className="text-xs text-[#ba9de0]">
                  Westbridge University · Campus update
                </span>
                <h2 className="mt-4 text-xl font-semibold">{selected}</h2>
                <p className="mt-5 text-sm leading-7 text-[#baacc8]">
                  {selected.includes("exam")
                    ? "The Fall 2024 final examination timetable has been published. Final exams will take place December 9–20. Please check your course schedule and contact the academic office if you have overlapping examinations. Bring your university ID to every exam."
                    : "Join students from across campus for a two-day innovation challenge on October 28–29 at the Innovation Hub. Teams of 2–4 are welcome. Mentors, refreshments, and prizes are included. Contact campuslife@westbridge.edu to register."}
                </p>
                <button
                  onClick={() => {
                    setModal("")
                    navigate("/timetable")
                  }}
                  className="mt-6 rounded-lg bg-[#b79be9] px-4 py-3 text-xs text-[#241831]"
                >
                  View your schedule
                </button>
              </>
            )}
            {modal === "quick" && (
              <>
                <h2 className="mb-6 text-lg font-semibold">
                  What would you like to do?
                </h2>
                {[
                  {
                    text: "Submit an assignment",
                    path: "/assignments",
                    icon: Upload,
                  },
                  {
                    text: "Check your schedule",
                    path: "/timetable",
                    icon: CalendarDays,
                  },
                  {
                    text: "Message a lecturer",
                    path: "/messages",
                    icon: MessageSquare,
                  },
                  {
                    text: "View academic progress",
                    path: "/grades",
                    icon: TrendingUp,
                  },
                ].map((action) => (
                  <button
                    key={action.path}
                    onClick={() => {
                      navigate(action.path)
                      setModal("")
                    }}
                    className="mb-3 flex w-full items-center gap-3 rounded-lg border border-border p-4 text-xs hover:bg-white/5"
                  >
                    <action.icon size={17} className="text-[#baa0e7]" />
                    {action.text}
                    <ArrowRight size={14} className="ml-auto" />
                  </button>
                ))}
              </>
            )}
            {modal === "support" && (
              <>
                <LifeBuoy className="text-[#b79be9]" />
                <h2 className="mt-4 text-xl font-semibold">
                  Your campus support team
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#b0a0bd]">
                  For academic questions, contact your course lecturer. For
                  technical assistance, email support@westbridge.edu or visit
                  the Student Services Center, Monday–Friday, 9 AM–5 PM.
                </p>
                <button
                  onClick={() => {
                    navigate("/messages")
                    setModal("")
                  }}
                  className="mt-6 rounded-lg bg-[#b79be9] px-4 py-3 text-xs text-[#241831]"
                >
                  Contact your lecturer
                </button>
              </>
            )}
            {(modal === "create" || modal === "attendance") && (
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  notify(
                    modal === "attendance"
                      ? "Attendance record saved."
                      : "Your draft has been saved.",
                  )
                  setModal("")
                }}
              >
                <h2 className="mb-5 text-lg font-semibold">
                  {modal === "attendance"
                    ? `Attendance · ${selected}`
                    : "Create a new academic update"}
                </h2>
                {modal === "attendance" ? (
                  [
                    "Alex Carter",
                    "Jordan Lee",
                    "Taylor Smith",
                    "Sam Rivera",
                  ].map((name) => (
                    <label
                      key={name}
                      className="flex items-center justify-between border-t border-border py-4 text-xs"
                    >
                      {name}
                      <input
                        type="checkbox"
                        defaultChecked
                        className="accent-[#b79be9]"
                      />
                    </label>
                  ))
                ) : (
                  <>
                    <input
                      required
                      placeholder="Title"
                      className="mb-4 w-full rounded-lg border border-border bg-[#282030] p-3 text-xs"
                    />
                    <textarea
                      required
                      placeholder="Instructions or announcement details"
                      rows={5}
                      className="w-full rounded-lg border border-border bg-[#282030] p-3 text-xs"
                    />
                  </>
                )}
                <button className="mt-5 w-full rounded-lg bg-[#b79be9] p-3 text-xs font-semibold text-[#241831]">
                  {modal === "attendance" ? "Save attendance" : "Save draft"}
                </button>
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  )
}
function Authentication() {
  const navigate = useNavigate()
  const [reset, setReset] = useState(false)
  const [sent, setSent] = useState(false)
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md p-8">
        <GraduationCap size={36} className="mb-7 text-[#b7a1ee]" />
        <h1 className="text-2xl font-semibold">
          {reset ? "Reset your password" : "Welcome to Universe"}
        </h1>
        <p className="mt-3 text-sm text-[#a398af]">
          {reset
            ? "Enter your university email to request password assistance."
            : "Your campus. Connected. Sign in to your academic workspace."}
        </p>
        {sent ? (
          <div
            role="status"
            className="mt-6 rounded-lg bg-[#80bf9b]/10 p-4 text-sm text-[#9cceaf]"
          >
            This is a demo workspace. Contact support@westbridge.edu for
            password assistance.
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault()
              reset ? setSent(true) : navigate("/")
            }}
            className="mt-7 space-y-5"
          >
            <label className="block text-xs text-[#a99bb7]">
              University email
              <input
                type="email"
                required
                placeholder="you@westbridge.edu"
                className="mt-2 w-full rounded-lg border border-border bg-[#211c29] p-3 text-sm text-white"
              />
            </label>
            {!reset && (
              <label className="block text-xs text-[#a99bb7]">
                Password
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="Enter your password"
                  className="mt-2 w-full rounded-lg border border-border bg-[#211c29] p-3 text-sm text-white"
                />
              </label>
            )}
            <button className="w-full rounded-lg bg-[#b7a1ee] p-3 text-sm font-semibold text-[#261d38]">
              {reset ? "Request assistance" : "Enter demo workspace"}
            </button>
          </form>
        )}
        <button
          onClick={() => {
            setReset(!reset)
            setSent(false)
          }}
          className="mt-5 text-xs text-[#b7a1ee]"
        >
          {reset ? "Back to sign in" : "Forgot your password?"}
        </button>
        <p className="mt-7 border-t border-border pt-5 text-[10px] leading-relaxed text-[#81758f]">
          Interactive frontend preview. Authentication and university SSO
          require a connected backend.
        </p>
      </Card>
    </div>
  )
}
const router = createBrowserRouter([
  { path: "/login", Component: Authentication },
  { path: "*", Component: Workspace },
])
export default function App() {
  return <RouterProvider router={router} />
}
