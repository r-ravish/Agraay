import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';
import { ArrowRight, ShieldCheck, Smartphone, ChartPie, BellRing, TrendingUp, Zap, BarChart3, Sparkles } from 'lucide-react';

const Home = () => {
    const { currentUser } = useAuth();

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero" id="home">
                <div className="container hero-container">
                    <div className="hero-content animate-fade-in">
                        <div className="badge">Premium & Ad-Free</div>
                        <h1 className="hero-title">
                            Master Your Money with <span className="text-gradient">AI Automation</span>
                        </h1>
                        <p className="hero-subtitle">
                            Track, categorize, and analyze every expense effortlessly. Agraay uses AI to keep your finances organized in seconds.
                        </p>
                        <div className="hero-actions">
                            {currentUser ? (
                                <Link to="/dashboard" className="btn btn-primary btn-large">
                                    Dashboard <ArrowRight size={20} className="ml-2" />
                                </Link>
                            ) : (
                                <>
                                    <Link to="/signup" className="btn btn-primary btn-large">
                                        Sign Up <ArrowRight size={20} className="ml-2" />
                                    </Link>
                                    <Link to="/login" className="btn btn-outline btn-large">
                                        Log In
                                    </Link>
                                </>
                            )}
                            <a href="#how" className="btn btn-outline btn-large">
                                See How It Works
                            </a>
                        </div>

                        <div className="hero-trust">
                            <div className="trust-item"><BarChart3 size={18} /> Smart Analytics</div>
                            <div className="trust-item"><Sparkles size={18} /> Instant Insights</div>
                        </div>
                    </div>

                    <div className="hero-graphics animate-fade-in">
                        {/* Abstract Graphic Representation of the App */}
                        <div className="phone-mockup">
                            <div className="phone-screen">
                                <div className="mockup-header">
                                    <div className="mockup-logo">Agraay</div>
                                    <div className="mockup-balance">₹12,450.00</div>
                                </div>
                                <div className="mockup-card">
                                    <div className="card-title">Monthly Expenses</div>
                                    <div className="card-amount">₹3,240.50</div>
                                </div>
                                <div className="mockup-list">
                                    <div className="mockup-item">
                                        <div className="mockup-icon util"></div>
                                        <div className="mockup-details">
                                            <h4>Electricity Bill</h4>
                                            <p>Today, 10:45 AM</p>
                                        </div>
                                        <div className="mockup-price">-₹120.00</div>
                                    </div>
                                    <div className="mockup-item">
                                        <div className="mockup-icon sub"></div>
                                        <div className="mockup-details">
                                            <h4>Netflix Subscription</h4>
                                            <p>Yesterday</p>
                                        </div>
                                        <div className="mockup-price">-₹15.99</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features" id="features">
                <div className="container">
                    <div className="section-header">
                        <h2>Powerful Features</h2>
                        <p>Experience a cutting-edge way to stay on top of your finances.</p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon"><ChartPie size={32} /></div>
                            <h3>Automated Categorization</h3>
                            <p>Categorizes your expenses and displays monthly trends using AI technology.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon"><BellRing size={32} /></div>
                            <h3>Bill Reminders</h3>
                            <p>Never miss a credit card or utility bill payment deadline again. Avoid late payment fees effortlessly.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon"><Smartphone size={32} /></div>
                            <h3>Account Balance</h3>
                            <p>Know the real-time balance of your bank accounts, mobile wallets, or credit cards on the fly.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon"><ShieldCheck size={32} /></div>
                            <h3>Fully Secure</h3>
                            <p>Your data never leaves your device. We use a local-first approach to ensure complete privacy.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works" id="how">
                <div className="container">
                    <div className="how-content">
                        <div className="how-text">
                            <h2>How Agraay Works</h2>
                            <p>Agraay is the singular hub for all your banks, credit cards, and e-wallets.</p>

                            <ul className="how-steps">
                                <li>
                                    <div className="step-number">1</div>
                                    <div className="step-info">
                                        <h4>AI Analysis</h4>
                                        <p>Our intelligent engine categorizes each transaction instantly.</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="step-number">2</div>
                                    <div className="step-info">
                                        <h4>Visual Budgeting</h4>
                                        <p>View your beautiful, automatically generated expense reports.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="how-image">
                            <div className="abstract-card-group">
                                <div className="abstract-card c1">Total Balance: ₹12,450</div>
                                <div className="abstract-card c2">Food: ₹450</div>
                                <div className="abstract-card c3">Travel: ₹120</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="pricing" id="pricing">
                <div className="container">
                    <div className="section-header">
                        <h2>Simple, Transparent Pricing</h2>
                        <p>Choose the plan that works best for you. Cancel anytime.</p>
                    </div>

                    <div className="pricing-grid">
                        {/* First Month */}
                        <div className="pricing-card">
                            <div className="pricing-plan-badge">Starter</div>
                            <div className="pricing-header">
                                <h3>First Month</h3>
                                <div className="price">₹50</div>
                                <p>One-time commitment fee to get started.</p>
                            </div>
                            <ul className="pricing-features">
                                <li><ShieldCheck size={20} color="var(--primary-light)" /> Full Access to All Features</li>
                                <li><ShieldCheck size={20} color="var(--primary-light)" /> AI-Powered Categorization</li>
                                <li><ShieldCheck size={20} color="var(--primary-light)" /> Smart Analytics Dashboard</li>
                            </ul>
                            <Link to="/signup" className="btn btn-primary btn-large">Get Started</Link>
                        </div>

                        {/* Monthly */}
                        <div className="pricing-card">
                            <div className="pricing-plan-badge">Monthly</div>
                            <div className="pricing-header">
                                <h3>Monthly</h3>
                                <div className="price">₹199<span className="pricing-period">/mo</span></div>
                                <p>Billed monthly after the first month.</p>
                            </div>
                            <ul className="pricing-features">
                                <li><ShieldCheck size={20} color="var(--primary-light)" /> Everything in Starter</li>
                                <li><ShieldCheck size={20} color="var(--primary-light)" /> Ad-Free Experience</li>
                                <li><ShieldCheck size={20} color="var(--primary-light)" /> Priority Support</li>
                            </ul>
                            <Link to="/signup" className="btn btn-outline btn-large">Subscribe</Link>
                        </div>

                        {/* Semi-Annual */}
                        <div className="pricing-card pricing-card-popular">
                            <div className="pricing-plan-badge popular">Most Popular</div>
                            <div className="pricing-header">
                                <h3>Semi-Annual</h3>
                                <div className="price">₹1,099<span className="pricing-period">/6 mo</span></div>
                                <p className="pricing-savings">~₹183/mo — Save 8%</p>
                            </div>
                            <ul className="pricing-features">
                                <li><ShieldCheck size={20} color="var(--primary-light)" /> Everything in Monthly</li>
                                <li><ShieldCheck size={20} color="var(--primary-light)" /> Visual Monthly Trends</li>
                                <li><ShieldCheck size={20} color="var(--primary-light)" /> Budget Planner</li>
                            </ul>
                            <Link to="/signup" className="btn btn-primary btn-large">Subscribe</Link>
                        </div>

                        {/* Annual */}
                        <div className="pricing-card">
                            <div className="pricing-plan-badge">Best Value</div>
                            <div className="pricing-header">
                                <h3>Annual</h3>
                                <div className="price">₹1,999<span className="pricing-period">/yr</span></div>
                                <p className="pricing-savings">~₹167/mo — Save 16%</p>
                            </div>
                            <ul className="pricing-features">
                                <li><ShieldCheck size={20} color="var(--primary-light)" /> Everything in Semi-Annual</li>
                                <li><ShieldCheck size={20} color="var(--primary-light)" /> Early Access to New Features</li>
                                <li><ShieldCheck size={20} color="var(--primary-light)" /> Dedicated Account Manager</li>
                            </ul>
                            <Link to="/signup" className="btn btn-primary btn-large">Subscribe</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section" id="mail">
                <div className="container">
                    <div className="section-header">
                        <h2>Get In Touch</h2>
                        <p>We're here to help you take control of your finances.</p>
                    </div>

                    <div className="contact-grid">
                        <div className="contact-card">
                            <div className="contact-icon">
                                <ShieldCheck size={32} />
                            </div>
                            <h3>Partner With Us</h3>
                            <p>For Emerging Influencers: Join our Influencer Program and grow alongside Agraay. Get early-access perks, creative briefs, and a share of every subscription you inspire.</p>
                            <a href="/partner" className="btn btn-outline">Join Us</a>
                        </div>

                        <div className="contact-card">
                            <div className="contact-icon">
                                <BellRing size={32} />
                            </div>
                            <h3>Need Support?</h3>
                            <p>Prefer email? Write to support@agraay.app. Want a quicker response? Click the chat bubble in the bottom-right corner and talk to us live.</p>
                            <a href="mailto:support@agraay.app" className="btn btn-primary">Email Support</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
