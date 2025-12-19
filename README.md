# React Router DOM Tutorial (Bangla Guide)

এই টিউটোরিয়ালটি React Router DOM ব্যবহার করে একটি কন্টাক্ট ম্যানেজমেন্ট অ্যাপ তৈরির সম্পূর্ণ গাইড। এখানে অফিশিয়াল টিউটোরিয়ালের প্রতিটি ধাপ এবং ধারণা বিস্তারিতভাবে বাংলায় ব্যাখ্যা করা হয়েছে।

## সূচিপত্র

1. [সেটআপ (Setup)](#1-সেটআপ-setup)
2. [রাউটার যোগ করা (Adding a Router)](#2-রাউটার-যোগ-করা-adding-a-router)
3. [রুট রুট এবং লেআউট (The Root Route)](#3-রুট-রুট-এবং-লেআউট-the-root-route)
4. [এরর হ্যান্ডলিং (Handling Not Found Errors)](#4-এরর-হ্যান্ডলিং-handling-not-found-errors)
5. [কন্টাক্ট রুট ইউআই (The Contact Route UI)](#5-কন্টাক্ট-রুট-ইউআই-the-contact-route-ui)
6. [নেস্টেড রুট (Nested Routes)](#6-নেস্টেড-রুট-nested-routes)
7. [ক্লায়েন্ট সাইড রাউটিং (Client Side Routing)](#7-ক্লায়েন্ট-সাইড-রাউটিং-client-side-routing)
8. [ডেটা লোডিং (Loading Data)](#8-ডেটা-লোডিং-loading-data)
9. [ডেটা তৈরি এবং ফর্ম (Data Writes + HTML Forms)](#9-ডেটা-তৈরি-এবং-ফর্ম-data-writes--html-forms)
10. [ইউআরএল প্যারামস (URL Params in Loaders)](#10-ইউআরএল-প্যারামস-url-params-in-loaders)
11. [ডেটা আপডেট করা (Updating Data)](#11-ডেটা-আপডেট-করা-updating-data)
12. [অ্যাক্টিভ লিঙ্ক স্টাইলিং (Active Link Styling)](#12-অ্যাক্টিভ-লিঙ্ক-স্টাইলিং-active-link-styling)
13. [গ্লোবাল পেন্ডিং ইউআই (Global Pending UI)](#13-গ্লোবাল-পেন্ডিং-ইউআই-global-pending-ui)
14. [রেকর্ড ডিলিট করা (Deleting Records)](#14-রেকর্ড-ডিলিট-করা-deleting-records)
15. [ইনডেক্স রুট (Index Routes)](#15-ইনডেক্স-রুট-index-routes)
16. [ক্যানসেল বাটন (Cancel Button)](#16-ক্যানসেল-বাটন-cancel-button)
17. [সার্চ এবং ইউআরএল প্যারামস (URL Search Params)](#17-সার্চ-এবং-ইউআরএল-প্যারামস-url-search-params)
18. [নেভিগেশন ছাড়া মিউটেশন (Mutations Without Navigation)](#18-নেভিগেশন-ছাড়া-মিউটেশন-mutations-without-navigation)
19. [পাথলেস রুট (Pathless Routes)](#19-পাথলেস-রুট-pathless-routes)
20. [JSX রুটস (JSX Routes)](#20-jsx-রুটস-jsx-routes)

---

### 1. সেটআপ (Setup)

আমরা এই প্রজেক্টের জন্য **Vite** ব্যবহার করব। প্রথমে টার্মিনালে নিচের কমান্ডগুলো দিয়ে প্রজেক্ট সেটআপ করে নিন:

```bash
npm create vite@latest name-of-your-project -- --template react
cd <your new project directory>
npm install react-router-dom localforage match-sorter sort-by
npm run dev
```

প্রয়োজনীয় ফাইলগুলো (`src/contacts.js`, `src/index.css`) `src` ফোল্ডারে যোগ করুন এবং অপ্রয়োজনীয় ফাইলগুলো ডিলিট করে দিন।

---

### 2. রাউটার যোগ করা (Adding a Router)

প্রথমেই আমাদের একটি `Browser Router` তৈরি করতে হবে। `main.jsx` ফাইলে আমরা রাউটার কনফিগার করব। এটি ক্লায়েন্ট সাইড রাউটিং এনাল (enable) করবে।

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

---

### 3. রুট রুট এবং লেআউট (The Root Route)

অ্যাপের গ্লোবাল লেআউট (যেমন সাইডবার) তৈরি করার জন্য আমরা `Root` কম্পোনেন্ট বানাব।

- `src/routes/root.jsx` তৈরি করুন।
- সাইডবার এবং মেইন কন্টেন্ট এরিয়া (`detail`) তৈরি করুন।
- `main.jsx` এ `Root` কম্পোনেন্টকে রুট এলিমেন্ট হিসেবে সেট করুন।

---

### 4. এরর হ্যান্ডলিং (Handling Not Found Errors)

React Router ডিফল্টভাবে একটি এরর পেজ দেখায়, কিন্তু আমরা কাস্টম এরর পেজ তৈরি করতে পারি।

![Default React Router error element](https://reactrouter.com/_static/error-default.png)

- `src/error-page.jsx` তৈরি করুন।
- `useRouteError` হুক ব্যবহার করে এরর ডিটেইলস দেখুন।
- `main.jsx` এ `errorElement` হিসেবে এটি যুক্ত করুন। এর ফলে অ্যাপের যেকোনো রেন্ডারিং বা ডেটা লোডিং এররের সময় এই পেজটি দেখাবে।

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);
```

নিচে কাস্টম এরর পেজের উদাহরণ:

![Custom error page](https://reactrouter.com/_static/error-custom.png)

---

### 5. কন্টাক্ট রুট ইউআই (The Contact Route UI)

প্রতিটি কন্টাক্টের বিস্তারিত দেখার জন্য `Contact` কম্পোনেন্ট তৈরি করুন (`src/routes/contact.jsx`)। এরপর রাউটারে নতুন পাথ যোগ করুন:

```jsx
{
  path: "contacts/:contactId",
  element: <Contact />,
},
```

এখন কন্টাক্ট পেজটি দেখাবে, কিন্তু এটি প্যারেন্ট লেআউটের বাইরে থাকবে:

![Contact route rendering without the parent layout](https://reactrouter.com/_static/contact-no-layout.png)

---

### 6. নেস্টেড রুট (Nested Routes)

আমরা চাই `Contact` কম্পোনেন্টটি `Root` লেআউটের ভেতরে রেন্ডার হোক। এজন্য আমাদের একে `children` হিসেবে যোগ করতে হবে এবং `Root` কম্পোনেন্টে `<Outlet />` ব্যবহার করতে হবে।

**main.jsx:**
```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);
```

**Root.jsx:**
```jsx
import { Outlet } from "react-router-dom";
// ...
<div id="detail">
    <Outlet />
</div>
```

---

### 7. ক্লায়েন্ট সাইড রাউটিং (Client Side Routing)

সাধারণ `<a>` ট্যাগ ব্যবহার করলে ব্রাউজার পুরো পেজ রিফ্রেশ করে। React Router এ পেজ রিফ্রেশ ছাড়া নেভিগেট করতে `<Link>` কম্পোনেন্ট ব্যবহার করতে হয়।

```jsx
import { Link } from "react-router-dom";
// ...
<Link to={`contacts/1`}>Your Name</Link>
```

---

### 8. ডেটা লোডিং (Loading Data)

React Router ডেটা লোড করার জন্য **Loaders** ব্যবহার করে।

1.  **Loader তৈরি:** `src/routes/root.jsx` থেকে একটি `loader` ফাংশন এক্সপোর্ট করুন যা ডেটা ফেচ করবে।
2.  **Loader কনফিগার:** `main.jsx` এ রুটের সাথে `loader` প্রপ হিসেবে এটি যুক্ত করুন।
3.  **ডেটা এক্সেস:** কম্পোনেন্টের ভেতরে `useLoaderData` হুক ব্যবহার করে ডেটা পান।

```jsx
// root.jsx
export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

// main.jsx
{
  path: "/",
  element: <Root />,
  loader: rootLoader,
}

// Component
const { contacts } = useLoaderData();
```

প্রথম দিকে কোনো ডেটা না থাকলে পেজটি এরকম ফাঁকা দেখাবে:

![Blank contact list](https://reactrouter.com/_static/blank-list.png)

---

### 9. ডেটা তৈরি এবং ফর্ম (Data Writes + HTML Forms)

ডেটা তৈরি বা আপডেট করার জন্য React Router **Actions** এবং `<Form>` কম্পোনেন্ট ব্যবহার করে।

- সাধারণ HTML ফর্মের মতই, কিন্তু এটি সার্ভারে রিকোয়েস্ট না পাঠিয়ে ক্লায়েন্ট সাইড রাউটারের `action` এ ডেটা পাঠায়।
- `createContact` ফাংশন কল করার জন্য একটি `action` তৈরি করুন।
- `<Form method="post">` ব্যবহার করুন।
- ফর্ম সাবমিট হলে React Router অটোমেটিক্যালি সব `loader` রিভ্যালিডেট (revalidate) করে, ফলে ইউআই (UI) আপডেট হয়ে যায়।

নতুন কন্টাক্ট তৈরির পর এডিট পেজে রিডাইরেক্ট হবে:

![Redirect to edit page](https://reactrouter.com/_static/redirect-to-edit.png)

---

### 10. ইউআরএল প্যারামস (URL Params in Loaders)

ডায়নামিক ইউআরএল সেগমেন্ট (যেমন `:contactId`) এর মান লোডারে `params` অবজেক্টের মাধ্যমে পাওয়া যায়।

```jsx
// contact.jsx
export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact };
}
```

এটি ব্যবহার করে আমরা নির্দিষ্ট আইডির কন্টাক্ট ফেচ করতে পারি।

---

### 11. ডেটা আপডেট করা (Updating Data)

ডেটা এডিট করার জন্য আমরা `EditContact` রুট তৈরি করি।

![Edit contact page UI](https://reactrouter.com/_static/edit-page.png)

- `defaultValue` ব্যবহার করে ইনপুটে আগের ডেটা দেখানো হয়।
- `action` ফাংশনে `request.formData()` ব্যবহার করে ফর্মের ডেটা নেওয়া হয় এবং `Object.fromEntries(formData)` দিয়ে অবজেক্টে রূপান্তর করা হয়।
- আপডেট শেষে `redirect` ব্যবহার করে ইউজারকে অন্য পেজে পাঠানো হয়।

```jsx
export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}
```

আপডেট করার পর কন্টাক্ট পেজটি এমন দেখাবে:

![Updated contact](https://reactrouter.com/_static/updated-contact.png)

---

### 12. অ্যাক্টিভ লিঙ্ক স্টাইলিং (Active Link Styling)

সাইডবারে ইউজার বর্তমানে কোন পেজে আছে তা বোঝাতে `<NavLink>` ব্যবহার করা হয়। এটি একটি `isActive` এবং `isPending` প্রপ দেয় যা দিয়ে আমরা CSS ক্লাস পরিবর্তন করতে পারি।

```jsx
<NavLink
  to={`contacts/${contact.id}`}
  className={({ isActive, isPending }) =>
    isActive ? "active" : isPending ? "pending" : ""
  }
>
  {/* content */}
</NavLink>
```

---

### 13. গ্লোবাল পেন্ডিং ইউআই (Global Pending UI)

যখন ডেটা লোড হতে সময় নেয়, তখন ইউজারকে ফিডব্যাক দিতে `useNavigation` হুক ব্যবহার করা হয়।
`navigation.state` চেক করে ("loading", "submitting", বা "idle") আমরা লোডিং স্পিনার বা ফেড এফেক্ট দেখাতে পারি।

---

### 14. রেকর্ড ডিলিট করা (Deleting Records)

ডিলিট করার জন্য আমরা আলাদা রুট এবং অ্যাকশন ব্যবহার করি।
- `<Form action="destroy">` ব্যবহার করলে এটি রিলেটিভ পাথ `contacts/:contactId/destroy` এ রিকোয়েস্ট পাঠায়।
- `destroy.jsx` ফাইলে একটি `action` থাকে যা কন্টাক্ট ডিলিট করে এবং হোমপেজে রিডাইরেক্ট করে।

---

### 15. ইনডেক্স রুট (Index Routes)

যখন আমরা প্যারেন্ট রুটে থাকি (যেমন `/`), তখন `<Outlet>` এ কিছু রেন্ডার হয় না। ডিফল্ট কিছু দেখানোর জন্য `index: true` দিয়ে একটি রুট সেট করা হয়।

![Index route](https://reactrouter.com/_static/index-route.png)

```jsx
{ index: true, element: <Index /> }
```

---

### 16. ক্যানসেল বাটন (Cancel Button)

এডিট পেজে ক্যানসেল বাটনে ক্লিক করলে আগের পেজে ফিরে যাওয়ার জন্য `useNavigate` হুক ব্যবহার করা হয়।

```jsx
const navigate = useNavigate();
<button onClick={() => navigate(-1)}>Cancel</button>
```

`navigate(-1)` ব্রাউজার হিস্ট্রিতে এক ধাপ পেছনে নিয়ে যায়।

---

### 17. সার্চ এবং ইউআরএল প্যারামস (URL Search Params)

সার্চ ফর্ম সাধারণত `GET` রিকোয়েস্ট হয়, তাই এটি `action` এর বদলে `loader` এ হিট করে।
- `<Form role="search">` ব্যবহার করলে ইউআরএল এ কুয়েরি প্যারামিটার (যেমন `?q=name`) যোগ হয়।
- লোডারে `request.url` থেকে এই প্যারামিটার নিয়ে ডেটা ফিল্টার করা হয়।
- ইনপুট ফিল্ডের ভ্যালু সিঙ্ক রাখতে `useEffect` ব্যবহার করে `q` এর মান ইনপুটে সেট করা হয়।
- প্রতি কি-স্ট্রোক এ সার্চ করার জন্য `useSubmit` হুক ব্যবহার করা হয়।
- হিস্ট্রি স্ট্যাক যাতে ভরে না যায়, তাই `replace: true` অপশন ব্যবহার করা হয়।

সার্চ করার সময় একটি স্পিনার দেখানোর জন্য:

![Search spinner](https://reactrouter.com/_static/search-spinner.png)

---

### 18. নেভিগেশন ছাড়া মিউটেশন (Mutations Without Navigation)

সবসময় পেজ চেঞ্জ করার দরকার হয় না (যেমন "ফেভারিট" বাটন)। এর জন্য `useFetcher` ব্যবহার করা হয়।
- `<fetcher.Form>` ব্যবহার করলে ইউআরএল পরিবর্তন না করেই অ্যাকশন কল করা যায় এবং ডেটা রিভ্যালিডেট হয়।
- **Optimistic UI:** নেটওয়ার্ক রিকোয়েস্ট শেষ হওয়ার আগেই ইউআই আপডেট করে ইউজারকে দ্রুত রেসপন্স দেয়া হয়। `fetcher.formData` চেক করে আমরা বুঝতে পারি ইউজার কী ভ্যালু সাবমিট করেছে এবং তাৎক্ষণিকভাবে তা দেখাতে পারি।

![Optimistic UI](https://reactrouter.com/_static/optimistic-ui.png)

---

### 19. পাথলেস রুট (Pathless Routes)

যদি আমরা চাই কোনো এরর হলে সেটি পুরো পেজ জুড়ে না দেখিয়ে শুধু আউটলেটের ভেতরে দেখাক, তাহলে আমরা চাইল্ড রুটগুলোকে একটি পাথহীন (pathless) রুটে র‍্যাপ (wrap) করতে পারি।

```jsx
{
  element: <Root />,
  children: [
    {
      errorElement: <ErrorPage />, // এই এরর এলিমেন্ট এখন চাইল্ড রুটগুলোর এরর ধরবে
      children: [
        /* সব চাইল্ড রুট এখানে */
      ],
    },
  ],
}
```

---

### 20. JSX রুটস (JSX Routes)

React Router কনফিগার করার জন্য অবজেক্ট স্টাইলের বদলে JSX স্টাইলও ব্যবহার করা যায়। `createRoutesFromElements` এবং `<Route>` কম্পোনেন্ট ব্যবহার করে এটি করা হয়।

```jsx
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="contacts/:contactId" element={<Contact />} />
    </Route>
  )
);
```

---

**অভিনন্দন!** আপনি এখন React Router DOM এর মূল ধারণাগুলো জানেন এবং একটি ফাংশনাল কন্টাক্ট অ্যাপ তৈরি করতে সক্ষম। আরো বিস্তারিত জানার জন্য [অফিশিয়াল ডকুমেন্টেশন](https://reactrouter.com) দেখুন।
