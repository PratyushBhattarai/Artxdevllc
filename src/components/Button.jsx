// src/components/Button.jsx
const Button = ({ text, onClick, variant = "primary" }) => {
  const isPrimary = variant === "primary";
  
  return (
    <button 
      onClick={onClick}
      style={{
        background: isPrimary ? 'var(--accent-color)' : 'transparent',
        color: isPrimary ? 'var(--bg-primary)' : 'var(--text-primary)',
        border: isPrimary ? 'none' : '1px solid var(--border-color)',
        padding: '12px 28px',
        borderRadius: '30px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
    >
      {text}
    </button>
  );
};

export default Button;