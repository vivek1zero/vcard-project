import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown, ChevronUp, User, Phone, Mail, Globe, MapPin,
  Briefcase, Share2, Palette, Download, Save, ArrowRight,
  Facebook, Linkedin, Send, LogOut
} from 'lucide-react';
import '../index.css';

const CreateCard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vcardName: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    phone: '',
    fax: '',
    email: '',
    company: '',
    jobTitle: '',
    address: '',
    website: '',
    summary: 'Seeking for freelance work with over 10 years of graphic design experience. Feel free to get in touch!',
    primaryColor: '#455a64',
    buttonColor: '#e51e63',
    profileImage: null,
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    }
  });

  const [activeAccordion, setActiveAccordion] = useState('info');
  const [viewMode, setViewMode] = useState('preview');
  const [showMap, setShowMap] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? '' : id);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const colorPalettes = [
    { primary: '#455a64', button: '#e51e63' },
    { primary: '#0ea5e9', button: '#f43f5e' },
    { primary: '#ef4444', button: '#f9a8d4' },
    { primary: '#22c55e', button: '#fbbf24' },
    { primary: '#78350f', button: '#fb923c' },
    { primary: '#10b981', button: '#f472b6' },
    { primary: '#ec4899', button: '#3b82f6' },
    { primary: '#f97316', button: '#6366f1' },
    { primary: '#8b5cf6', button: '#10b981' },
    { primary: '#3b82f6', button: '#ef4444' },
  ];

  const vCardString = `BEGIN:VCARD\nVERSION:3.0\nN:${formData.lastName};${formData.firstName};;;\nFN:${formData.firstName} ${formData.lastName}\nORG:${formData.company}\nTITLE:${formData.jobTitle}\nTEL;TYPE=CELL,VOICE:${formData.mobileNumber}\nTEL;TYPE=WORK,VOICE:${formData.phone}\nTEL;TYPE=FAX,VOICE:${formData.fax}\nADR;TYPE=WORK:;;${formData.address}\nURL:${formData.website}\nEMAIL;TYPE=PREF,INTERNET:${formData.email}\nNOTE:${formData.summary}\nEND:VCARD`;

  return (
    <div className="app-container">
      {/* TOP NAV */}
      <div className="top-nav">
        <div className="nav-left">
          <Share2 size={24} color="#0ea5e9" />
          <span className="nav-title">vCard Creator</span>
        </div>
        <div className="nav-right">
          <span className="user-email">{user?.email}</span>
          <button onClick={handleLogout} className="btn-logout">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* LEFT: FORM SECTION */}
      <div className="form-section">
        <div className="form-header">
          <div style={{ background: '#f1f5f9', padding: '10px', borderRadius: '12px' }}>
            <Share2 size={24} color="#475569" />
          </div>
          <h1>Name your QR Code</h1>
        </div>

        <div className="input-wrapper">
          <input
            name="vcardName"
            value={formData.vcardName}
            onChange={handleInputChange}
            placeholder="e.g. My Professional Card"
            className="input-main"
          />
        </div>

        {/* Your Information */}
        <div className={`accordion-item ${activeAccordion === 'info' ? 'active' : ''}`}>
          <div className="accordion-header" onClick={() => toggleAccordion('info')}>
            <span><User size={20} /> Your Information</span>
            {activeAccordion === 'info' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          {activeAccordion === 'info' && (
            <div className="accordion-content">
              <div className="upload-area">
                <div className="avatar-placeholder">
                  {formData.profileImage ? (
                    <img src={formData.profileImage} className="avatar-img" alt="Profile" />
                  ) : (
                    <User size={32} color="#cbd5e1" />
                  )}
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', marginBottom: '4px' }}>Profile Image</h4>
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>JPG, PNG or GIF. Max 5MB.</p>
                  <input type="file" id="img-upload" hidden onChange={handleImageUpload} />
                  <button onClick={() => document.getElementById('img-upload').click()} style={{ background: '#0ea5e9', color: 'white', padding: '8px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', border: 'none' }}>
                    Choose File
                  </button>
                </div>
              </div>

              <div className="field-grid">
                <div className="field-group">
                  <label className="field-label">First Name</label>
                  <input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="e.g. Jane" />
                </div>
                <div className="field-group">
                  <label className="field-label">Last Name</label>
                  <input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="e.g. Doe" />
                </div>

                <div className="field-group">
                  <label className="field-label">Mobile Number</label>
                  <input name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} placeholder="+1 234 567 890" />
                </div>
                <div className="field-group">
                  <label className="field-label">Work Phone</label>
                  <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 234 000 000" />
                </div>

                <div className="field-group" style={{ gridColumn: 'span 2' }}>
                  <label className="field-label">Email Address</label>
                  <input name="email" value={formData.email} onChange={handleInputChange} placeholder="jane.doe@example.com" />
                </div>

                <div className="field-group">
                  <label className="field-label">Company</label>
                  <input name="company" value={formData.company} onChange={handleInputChange} placeholder="Company Name" />
                </div>
                <div className="field-group">
                  <label className="field-label">Job Title</label>
                  <input name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} placeholder="e.g. UI Designer" />
                </div>

                <div className="field-group" style={{ gridColumn: 'span 2' }}>
                  <label className="field-label">Street Address</label>
                  <textarea rows="2" name="address" value={formData.address} onChange={handleInputChange} placeholder="123 Creative Way, Design City" />
                </div>

                <div className="field-group" style={{ gridColumn: 'span 2' }}>
                  <label className="field-label">Bio / Summary</label>
                  <textarea rows="3" name="summary" value={formData.summary} onChange={handleInputChange} placeholder="Tell us about yourself..." />
                  <div style={{ textAlign: 'right', fontSize: '11px', color: '#94a3b8' }}>{formData.summary.length}/200</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Design & Customize */}
        <div className={`accordion-item ${activeAccordion === 'design' ? 'active' : ''}`}>
          <div className="accordion-header" onClick={() => toggleAccordion('design')}>
            <span><Palette size={20} /> Design & Colors</span>
            {activeAccordion === 'design' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          {activeAccordion === 'design' && (
            <div className="accordion-content">
              <label className="field-label">Preset Themes</label>
              <div className="palette-grid">
                {colorPalettes.map((p, i) => (
                  <div
                    key={i}
                    className={`palette-item ${formData.primaryColor === p.primary ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, primaryColor: p.primary, buttonColor: p.button }))}
                  >
                    <div className="palette-inner">
                      <div style={{ flex: 1, background: p.primary }}></div>
                      <div style={{ height: '30%', background: p.button }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="field-grid">
                <div className="field-group">
                  <label className="field-label">Primary Color</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input name="primaryColor" value={formData.primaryColor} onChange={handleInputChange} style={{ width: '44px', padding: '2px', height: '44px', cursor: 'pointer' }} type="color" />
                    <input value={formData.primaryColor.toUpperCase()} readOnly style={{ flex: 1, textTransform: 'uppercase', fontSize: '13px' }} />
                  </div>
                </div>
                <div className="field-group">
                  <label className="field-label">Action Color</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input name="buttonColor" value={formData.buttonColor} onChange={handleInputChange} style={{ width: '44px', padding: '2px', height: '44px', cursor: 'pointer' }} type="color" />
                    <input value={formData.buttonColor.toUpperCase()} readOnly style={{ flex: 1, textTransform: 'uppercase', fontSize: '13px' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className={`accordion-item ${activeAccordion === 'social' ? 'active' : ''}`}>
          <div className="accordion-header" onClick={() => toggleAccordion('social')}>
            <span><Globe size={20} /> Social Media Links</span>
            {activeAccordion === 'social' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          {activeAccordion === 'social' && (
            <div className="accordion-content">
              <div className="field-group" style={{ marginBottom: '16px' }}>
                <label className="field-label">Facebook Profile</label>
                <div style={{ position: 'relative' }}>
                  <Facebook size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input name="socialLinks.facebook" value={formData.socialLinks.facebook} onChange={handleInputChange} placeholder="facebook.com/username" style={{ paddingLeft: '40px' }} />
                </div>
              </div>
              <div className="field-group">
                <label className="field-label">LinkedIn Profile</label>
                <div style={{ position: 'relative' }}>
                  <Linkedin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input name="socialLinks.linkedin" value={formData.socialLinks.linkedin} onChange={handleInputChange} placeholder="linkedin.com/in/username" style={{ paddingLeft: '40px' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER ACTION BAR */}
      <div className="footer-bar">
        <button className="btn-premium btn-save">
          <Save size={18} /> Save Draft
        </button>
        <button className="btn-premium btn-next">
          Generate QR <ArrowRight size={18} />
        </button>
      </div>

      {/* RIGHT: PREVIEW PANEL */}
      <div className="preview-section">
        <div className="toggle-container">
          <button
            className={`toggle-btn ${viewMode === 'preview' ? 'active' : ''}`}
            onClick={() => setViewMode('preview')}
          >Device Preview</button>
          <button
            className={`toggle-btn ${viewMode === 'qr' ? 'active' : ''}`}
            onClick={() => setViewMode('qr')}
          >QR Asset</button>
        </div>

        {viewMode === 'preview' ? (
          <div className="phone-frame">
            <div style={{ background: formData.primaryColor, padding: '40px 20px 0', textAlign: 'center', color: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <div style={{
                  width: '110px', height: '110px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.2)',
                  overflow: 'hidden', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {formData.profileImage ? (
                    <img src={formData.profileImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <User size={50} color={formData.primaryColor} />
                  )}
                </div>
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '4px' }}>
                {formData.firstName || "Jane"} {formData.lastName || "Doe"}
              </h2>
              <p style={{ fontSize: '13px', opacity: 0.8, fontStyle: 'italic', marginBottom: '25px', padding: '0 20px' }}>
                "{formData.summary}"
              </p>

              <div className="action-strip">
                <a href={`tel:${formData.mobileNumber}`} style={{ textDecoration: 'none', color: 'inherit' }} className="action-tile">
                  <Phone size={20} fill="white" />
                  <span>CALL</span>
                </a>
                <a href={`mailto:${formData.email}`} style={{ textDecoration: 'none', color: 'inherit' }} className="action-tile">
                  <Send size={20} fill="white" />
                  <span>EMAIL</span>
                </a>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setShowMap(true); }}
                  style={{ textDecoration: 'none', color: 'inherit', border: 'none' }}
                  className="action-tile"
                >
                  <MapPin size={20} fill="white" />
                  <span>MAP</span>
                </a>
              </div>
            </div>

            <div className="phone-scroll-area">
              {showMap && (
                <div style={{
                  position: 'absolute', top: '240px', left: 0, right: 0, bottom: 0,
                  background: 'white', zIndex: 10, display: 'flex', flexDirection: 'column'
                }}>
                  <div style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700' }}>Location Map</span>
                    <button onClick={() => setShowMap(false)} style={{ background: '#f1f5f9', border: 'none', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>Close</button>
                  </div>
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(formData.address || 'London')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              {[
                { icon: <Phone size={18} />, title: formData.mobileNumber || "+1 234 567 890", sub: "Personal Mobile" },
                { icon: <Mail size={18} />, title: formData.email || "jane.doe@example.com", sub: "Official Email" },
                { icon: <Briefcase size={18} />, title: formData.jobTitle || "Job Title", sub: formData.company || "Your Company" },
                { icon: <MapPin size={18} />, title: formData.address || "123 Creative St, New York", sub: "Office Address" },
                { icon: <Globe size={18} />, title: formData.website || "www.example.com", sub: "Portfolio" }
              ].map((item, idx) => (
                <div className="phone-info-item" key={idx} style={{ paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                  <div className="phone-icon-box" style={{ color: formData.primaryColor }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600' }}>{item.title}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{item.sub}</div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>External Links</p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                  {[
                    { link: formData.socialLinks.facebook, color: '#1877F2', icon: <Facebook size={20} fill="white" /> },
                    { link: formData.socialLinks.linkedin, color: '#0A66C2', icon: <Linkedin size={20} fill="white" /> }
                  ].map((s, i) => (
                    <div key={i} style={{
                      width: '44px', height: '44px', background: s.link ? s.color : '#f1f5f9',
                      borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: s.link ? 1 : 0.3
                    }}>
                      {s.icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="fab" style={{ background: formData.buttonColor, width: '56px', height: '56px', bottom: '30px', right: '25px' }}>
              <Download size={24} color="white" />
            </div>
          </div>
        ) : (
          <div style={{
            background: 'white', padding: '60px', borderRadius: '32px', textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0'
          }}>
            <QRCodeSVG value={vCardString} size={240} level="H" includeMargin={true} />
            <div style={{ marginTop: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700' }}>Contact Scan Code</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '8px' }}>Scanning this will automatically add <br /> {formData.firstName || 'User'} to the recipient's phone book.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCard;
