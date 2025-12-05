import {
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  Globe,
  Loader2,
  Sparkles,
  X,
} from "lucide-react";
import React, { createContext, useContext, useEffect, useState } from "react";

// Context for form data and language
const AppContext = createContext();

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

// Translations
const translations = {
  en: {
    title: "Social Support Application",
    subtitle: "Apply for Financial Assistance",
    step1: "Personal Information",
    step2: "Family & Financial Info",
    step3: "Situation Descriptions",
    next: "Next",
    previous: "Previous",
    submit: "Submit Application",
    saving: "Saving...",
    name: "Full Name",
    nationalId: "National ID",
    dob: "Date of Birth",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    address: "Address",
    city: "City",
    state: "State/Province",
    country: "Country",
    phone: "Phone Number",
    email: "Email Address",
    maritalStatus: "Marital Status",
    single: "Single",
    married: "Married",
    divorced: "Divorced",
    widowed: "Widowed",
    dependents: "Number of Dependents",
    employmentStatus: "Employment Status",
    employed: "Employed",
    unemployed: "Unemployed",
    selfEmployed: "Self-Employed",
    retired: "Retired",
    monthlyIncome: "Monthly Income",
    housingStatus: "Housing Status",
    owned: "Owned",
    rented: "Rented",
    homeless: "Homeless",
    withFamily: "Living with Family",
    financialSituation: "Current Financial Situation",
    employmentCircumstances: "Employment Circumstances",
    reasonForApplying: "Reason for Applying",
    helpMeWrite: "Help Me Write",
    aiSuggestion: "AI Suggestion",
    accept: "Accept",
    edit: "Edit & Use",
    discard: "Discard",
    generating: "Generating...",
    required: "This field is required",
    invalidEmail: "Please enter a valid email address",
    invalidPhone: "Please enter a valid phone number",
    minLength: "Must be at least {min} characters",
    progressSaved: "Progress saved automatically",
    submitting: "Submitting your application...",
    successTitle: "Application Submitted Successfully!",
    successMessage: "Your application has been received. Reference ID: ",
    setupApiKey: "Setup OpenAI API Key",
    apiKeyPlaceholder: "Enter your OpenAI API key (starts with sk-)",
    saveApiKey: "Save API Key",
    apiKeyInfo: "Your API key is stored locally and never shared.",
    noApiKey: "No API key configured. Using mock responses.",
  },
  ar: {
    title: "طلب الدعم الاجتماعي",
    subtitle: "التقدم للحصول على المساعدة المالية",
    step1: "المعلومات الشخصية",
    step2: "معلومات الأسرة والمالية",
    step3: "وصف الحالة",
    next: "التالي",
    previous: "السابق",
    submit: "إرسال الطلب",
    saving: "جاري الحفظ...",
    name: "الاسم الكامل",
    nationalId: "رقم الهوية الوطنية",
    dob: "تاريخ الميلاد",
    gender: "الجنس",
    male: "ذكر",
    female: "أنثى",
    other: "آخر",
    address: "العنوان",
    city: "المدينة",
    state: "المحافظة/الولاية",
    country: "الدولة",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    maritalStatus: "الحالة الاجتماعية",
    single: "أعزب",
    married: "متزوج",
    divorced: "مطلق",
    widowed: "أرمل",
    dependents: "عدد المعالين",
    employmentStatus: "حالة التوظيف",
    employed: "موظف",
    unemployed: "عاطل عن العمل",
    selfEmployed: "عمل حر",
    retired: "متقاعد",
    monthlyIncome: "الدخل الشهري",
    housingStatus: "حالة السكن",
    owned: "مملوك",
    rented: "مستأجر",
    homeless: "بلا مأوى",
    withFamily: "يعيش مع العائلة",
    financialSituation: "الوضع المالي الحالي",
    employmentCircumstances: "ظروف العمل",
    reasonForApplying: "سبب التقديم",
    helpMeWrite: "ساعدني في الكتابة",
    aiSuggestion: "اقتراح الذكاء الاصطناعي",
    accept: "قبول",
    edit: "تعديل واستخدام",
    discard: "تجاهل",
    generating: "جاري الإنشاء...",
    required: "هذا الحقل مطلوب",
    invalidEmail: "يرجى إدخال بريد إلكتروني صحيح",
    invalidPhone: "يرجى إدخال رقم هاتف صحيح",
    minLength: "يجب أن يكون على الأقل {min} حرفًا",
    progressSaved: "تم حفظ التقدم تلقائيًا",
    submitting: "جاري إرسال طلبك...",
    successTitle: "تم إرسال الطلب بنجاح!",
    successMessage: "تم استلام طلبك. رقم المرجع: ",
    setupApiKey: "إعداد مفتاح OpenAI API",
    apiKeyPlaceholder: "أدخل مفتاح API الخاص بك (يبدأ بـ sk-)",
    saveApiKey: "حفظ المفتاح",
    apiKeyInfo: "يتم تخزين المفتاح محليًا ولا يتم مشاركته أبدًا.",
    noApiKey: "لم يتم تكوين مفتاح API. استخدام الردود التجريبية.",
  },
};

// App Provider Component
const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    // Load saved progress
    const saved = localStorage.getItem("socialSupportForm");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed.formData || {});
        setCurrentStep(parsed.currentStep || 1);
      } catch (e) {
        console.error("Failed to load saved progress");
      }
    }

    // Load API key
    const savedKey = localStorage.getItem("openai_api_key");
    if (savedKey) setApiKey(savedKey);
  }, []);

  useEffect(() => {
    // Save progress
    localStorage.setItem(
      "socialSupportForm",
      JSON.stringify({
        formData,
        currentStep,
        timestamp: new Date().toISOString(),
      })
    );
  }, [formData, currentStep]);

  const t = (key, params = {}) => {
    let text = translations[language][key] || key;
    Object.keys(params).forEach((param) => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        language,
        toggleLanguage,
        t,
        currentStep,
        setCurrentStep,
        formData,
        setFormData,
        updateFormData,
        errors,
        setErrors,
        apiKey,
        setApiKey,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Input Component
const Input = ({ label, name, type = "text", required = false, ...props }) => {
  const { formData, updateFormData, errors, t } = useApp();

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={formData[name] || ""}
        onChange={(e) => updateFormData(name, e.target.value)}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle size={14} />
          {errors[name]}
        </p>
      )}
    </div>
  );
};

// Select Component
const Select = ({ label, name, options, required = false }) => {
  const { formData, updateFormData, errors, t } = useApp();

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={formData[name] || ""}
        onChange={(e) => updateFormData(name, e.target.value)}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle size={14} />
          {errors[name]}
        </p>
      )}
    </div>
  );
};

// Textarea with AI Component
const TextareaWithAI = ({ label, name, required = false, promptContext }) => {
  const { formData, updateFormData, errors, t, apiKey } = useApp();
  const [showAI, setShowAI] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateAISuggestion = async () => {
    setLoading(true);
    setError("");

    try {
      if (!apiKey || !apiKey.startsWith("sk-")) {
        // Mock response for demo
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const mockResponses = {
          financialSituation:
            "I am currently facing significant financial challenges due to recent job loss and mounting expenses. My savings have been depleted, and I am struggling to meet basic needs for my family including rent, utilities, and groceries. Despite actively searching for employment, the current economic situation has made it difficult to secure stable income.",
          employmentCircumstances:
            "I was previously employed as a sales associate but lost my position three months ago due to company downsizing. Since then, I have been actively applying for jobs and attending interviews, but have not yet secured new employment. I am willing and able to work in various capacities and am currently enrolled in an online skills training program to improve my prospects.",
          reasonForApplying:
            "I am applying for this assistance to help cover essential living expenses during this transitional period. The support would help ensure my family has access to basic necessities such as food, housing, and utilities while I continue my job search and skills development. This assistance would provide crucial stability and allow me to focus on securing sustainable employment without the constant stress of immediate financial crisis.",
        };
        setAiSuggestion(
          mockResponses[name] ||
            "This is a sample AI-generated response to help you describe your situation clearly and effectively."
        );
      } else {
        // Real API call
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "user",
                  content: `Help me write a clear and respectful description for a social support application. Context: ${promptContext}. Current text: ${
                    formData[name] || "none"
                  }. Provide a professional, empathetic paragraph (100-150 words) that explains the situation clearly.`,
                },
              ],
              max_tokens: 300,
              temperature: 0.7,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to generate suggestion");
        }

        const data = await response.json();
        setAiSuggestion(data.choices[0].message.content.trim());
      }

      setShowAI(true);
    } catch (err) {
      setError("Failed to generate suggestion. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const acceptSuggestion = () => {
    updateFormData(name, aiSuggestion);
    setShowAI(false);
    setAiSuggestion("");
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <textarea
          value={formData[name] || ""}
          onChange={(e) => updateFormData(name, e.target.value)}
          rows={4}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors[name] ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={generateAISuggestion}
          disabled={loading}
          className="absolute top-2 right-2 flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 disabled:bg-gray-400"
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              {t("generating")}
            </>
          ) : (
            <>
              <Sparkles size={14} />
              {t("helpMeWrite")}
            </>
          )}
        </button>
      </div>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle size={14} />
          {errors[name]}
        </p>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {showAI && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="text-purple-600" />
                {t("aiSuggestion")}
              </h3>
              <button
                onClick={() => setShowAI(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <textarea
                value={aiSuggestion}
                onChange={(e) => setAiSuggestion(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowAI(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {t("discard")}
              </button>
              <button
                onClick={acceptSuggestion}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1"
              >
                <Check size={16} />
                {t("accept")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Step 1: Personal Information
const Step1 = () => {
  const { t } = useApp();

  return (
    <div className="space-y-4">
      <Input label={t("name")} name="name" required />
      <Input label={t("nationalId")} name="nationalId" required />
      <Input label={t("dob")} name="dob" type="date" required />
      <Select
        label={t("gender")}
        name="gender"
        required
        options={[
          { value: "male", label: t("male") },
          { value: "female", label: t("female") },
          { value: "other", label: t("other") },
        ]}
      />
      <Input label={t("address")} name="address" required />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label={t("city")} name="city" required />
        <Input label={t("state")} name="state" required />
      </div>
      <Input label={t("country")} name="country" required />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label={t("phone")} name="phone" type="tel" required />
        <Input label={t("email")} name="email" type="email" required />
      </div>
    </div>
  );
};

// Step 2: Family & Financial Info
const Step2 = () => {
  const { t } = useApp();

  return (
    <div className="space-y-4">
      <Select
        label={t("maritalStatus")}
        name="maritalStatus"
        required
        options={[
          { value: "single", label: t("single") },
          { value: "married", label: t("married") },
          { value: "divorced", label: t("divorced") },
          { value: "widowed", label: t("widowed") },
        ]}
      />
      <Input
        label={t("dependents")}
        name="dependents"
        type="number"
        min="0"
        required
      />
      <Select
        label={t("employmentStatus")}
        name="employmentStatus"
        required
        options={[
          { value: "employed", label: t("employed") },
          { value: "unemployed", label: t("unemployed") },
          { value: "selfEmployed", label: t("selfEmployed") },
          { value: "retired", label: t("retired") },
        ]}
      />
      <Input
        label={t("monthlyIncome")}
        name="monthlyIncome"
        type="number"
        min="0"
        required
      />
      <Select
        label={t("housingStatus")}
        name="housingStatus"
        required
        options={[
          { value: "owned", label: t("owned") },
          { value: "rented", label: t("rented") },
          { value: "homeless", label: t("homeless") },
          { value: "withFamily", label: t("withFamily") },
        ]}
      />
    </div>
  );
};

// Step 3: Situation Descriptions
const Step3 = () => {
  const { t } = useApp();

  return (
    <div className="space-y-6">
      <TextareaWithAI
        label={t("financialSituation")}
        name="financialSituation"
        required
        promptContext="Describe your current financial situation and challenges"
      />
      <TextareaWithAI
        label={t("employmentCircumstances")}
        name="employmentCircumstances"
        required
        promptContext="Explain your employment circumstances and job search efforts"
      />
      <TextareaWithAI
        label={t("reasonForApplying")}
        name="reasonForApplying"
        required
        promptContext="Explain why you are applying for social support"
      />
    </div>
  );
};

// Progress Bar
const ProgressBar = () => {
  const { currentStep, t } = useApp();
  const steps = [
    { num: 1, label: t("step1") },
    { num: 2, label: t("step2") },
    { num: 3, label: t("step3") },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => (
          <React.Fragment key={step.num}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step.num
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {currentStep > step.num ? <Check size={20} /> : step.num}
              </div>
              <span className="text-xs mt-1 text-center max-w-[80px]">
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  currentStep > step.num ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// API Key Setup Modal
const ApiKeyModal = ({ show, onClose }) => {
  const { apiKey, setApiKey, t } = useApp();
  const [tempKey, setTempKey] = useState(apiKey);

  const handleSave = () => {
    localStorage.setItem("openai_api_key", tempKey);
    setApiKey(tempKey);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{t("setupApiKey")}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <input
          type="password"
          value={tempKey}
          onChange={(e) => setTempKey(e.target.value)}
          placeholder={t("apiKeyPlaceholder")}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
        />
        <p className="text-sm text-gray-600 mb-4">{t("apiKeyInfo")}</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {t("saveApiKey")}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Form Component
const Form = () => {
  const {
    currentStep,
    setCurrentStep,
    formData,
    setErrors,
    t,
    language,
    apiKey,
  } = useApp();
  const [showApiModal, setShowApiModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name?.trim()) newErrors.name = t("required");
      if (!formData.nationalId?.trim()) newErrors.nationalId = t("required");
      if (!formData.dob) newErrors.dob = t("required");
      if (!formData.gender) newErrors.gender = t("required");
      if (!formData.address?.trim()) newErrors.address = t("required");
      if (!formData.city?.trim()) newErrors.city = t("required");
      if (!formData.state?.trim()) newErrors.state = t("required");
      if (!formData.country?.trim()) newErrors.country = t("required");
      if (!formData.phone?.trim()) newErrors.phone = t("required");
      else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone))
        newErrors.phone = t("invalidPhone");
      if (!formData.email?.trim()) newErrors.email = t("required");
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = t("invalidEmail");
    }

    if (step === 2) {
      if (!formData.maritalStatus) newErrors.maritalStatus = t("required");
      if (formData.dependents === undefined || formData.dependents === "")
        newErrors.dependents = t("required");
      if (!formData.employmentStatus)
        newErrors.employmentStatus = t("required");
      if (formData.monthlyIncome === undefined || formData.monthlyIncome === "")
        newErrors.monthlyIncome = t("required");
      if (!formData.housingStatus) newErrors.housingStatus = t("required");
    }

    if (step === 3) {
      if (!formData.financialSituation?.trim())
        newErrors.financialSituation = t("required");
      else if (formData.financialSituation.length < 50)
        newErrors.financialSituation = t("minLength", { min: 50 });
      if (!formData.employmentCircumstances?.trim())
        newErrors.employmentCircumstances = t("required");
      else if (formData.employmentCircumstances.length < 50)
        newErrors.employmentCircumstances = t("minLength", { min: 50 });
      if (!formData.reasonForApplying?.trim())
        newErrors.reasonForApplying = t("required");
      else if (formData.reasonForApplying.length < 50)
        newErrors.reasonForApplying = t("minLength", { min: 50 });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const refId = "SSA-" + Date.now().toString(36).toUpperCase();
    setReferenceId(refId);
    setSubmitted(true);

    // Clear saved progress
    localStorage.removeItem("socialSupportForm");

    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Check className="text-green-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("successTitle")}
        </h2>
        <p className="text-gray-600 mb-4">
          {t("successMessage")}
          <span className="font-mono font-semibold text-blue-600">
            {referenceId}
          </span>
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit New Application
        </button>
      </div>
    );
  }

  return (
    <div>
      <ProgressBar />

      <div className="mb-6">
        {currentStep === 1 && <Step1 />}
        {currentStep === 2 && <Step2 />}
        {currentStep === 3 && <Step3 />}
      </div>

      <div className="flex justify-between items-center pt-6 border-t">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
          {t("previous")}
        </button>

        {currentStep < 3 ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {t("next")}
            <ChevronRight size={20} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          >
            {submitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                {t("submitting")}
              </>
            ) : (
              <>
                <Check size={20} />
                {t("submit")}
              </>
            )}
          </button>
        )}
      </div>

      <ApiKeyModal show={showApiModal} onClose={() => setShowApiModal(false)} />

      {!apiKey && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800 mb-2">{t("noApiKey")}</p>
          <button
            onClick={() => setShowApiModal(true)}
            className="text-sm text-blue-600 hover:text-blue-700 underline"
          >
            {t("setupApiKey")}
          </button>
        </div>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  const { language, toggleLanguage, t, apiKey } = useApp();

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 ${
        language === "ar" ? "rtl" : "ltr"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t("title")}
              </h1>
              <p className="text-gray-600">{t("subtitle")}</p>
            </div>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              aria-label="Toggle language"
            >
              <Globe size={20} />
              <span className="font-semibold">
                {language === "en" ? "AR" : "EN"}
              </span>
            </button>
          </div>

          {/* Form */}
          <Form />

          {/* Footer */}
          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
            <p>{t("progressSaved")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Root Component with Provider
export default function SocialSupportApp() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}
