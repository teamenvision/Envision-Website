"use client";
import { useState } from "react";
import Image from "next/image";
import teamData from "../../data/team.json";
import "../../styles/team.css";
import React from "react";

type Member = {
  name: string;
  image: string;
};

type SubDepartment = {
  description: string;
  image: string;
  members: Member[];
};

type DepartmentLead = {
  name: string;
  role: string;
  image: string;
  color: string;
  description: string;
  departmentImage?: string;
  subDepartments?: Partial<Record<string, SubDepartment>>;
  members?: Member[];
};

export default function Team() {
  const [expandedDept, setExpandedDept] = useState<string | null>(null);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const toggleExpand = (leadName: string, index: number) => {
    if (isMobile) {
      setMobileExpandedIndex(prev => (prev === index ? null : index));
    } else {
      setExpandedDept(prev => (prev === leadName ? null : leadName));
    }
  };

  return (
    <section className="team-page">
      <h2 className="section-title">Our Team</h2>

      {/* Executives */}
      <div className="row executives">
        {teamData.executives.map((member, idx) => (
          <div className="lead-card" key={idx}>
            <Image src={member.image} alt={member.name} width={160} height={160} className="profile-img" />
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p className="desc">{member.description}</p>
          </div>
        ))}
      </div>

      {/* Secondary */}
      <div className="row secondary">
        {teamData.secondary.map((member, idx) => (
          <div className="lead-card" key={idx}>
            <Image src={member.image} alt={member.name} width={160} height={160} className="profile-img" />
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p className="desc">{member.description}</p>
          </div>
        ))}
      </div>

      {/* Department Leads */}
      <div className="row department-leads">
        {teamData.departmentLeads.map((lead: DepartmentLead, idx) => (
          <React.Fragment key={lead.name}>
            <div
              className="lead-card department-lead-card"
              key={idx}
              style={{ borderColor: lead.color, boxShadow: `0 0 10px ${lead.color}` }}
            >
              <Image src={lead.image} alt={lead.name} width={160} height={160} className="profile-img" />
              <h3>{lead.name}</h3>
              <p className="role">{lead.role}</p>
              <button
                className="expand-btn"
                style={{ borderColor: lead.color, color: lead.color }}
                onClick={() => toggleExpand(lead.name, idx)}
              >
                {(isMobile ? mobileExpandedIndex === idx : expandedDept === lead.name)
                  ? "Collapse Department"
                  : "Expand Department"}
              </button>
            </div>

            {/* Mobile-only expansion below the same card */}
            {isMobile && mobileExpandedIndex === idx && (
              <ExpandedDepartment lead={lead} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Desktop-only: expand section below all cards */}
      {!isMobile && expandedDept && (
        <div className="department-overview-container">
          {teamData.departmentLeads
            .filter((lead: DepartmentLead) => lead.name === expandedDept)
            .map((lead) => (
              <ExpandedDepartment key={lead.name} lead={lead} />
            ))}
        </div>
      )}
    </section>
  );
}

function ExpandedDepartment({ lead }: { lead: DepartmentLead }) {
  return (
    <div className="department-overview" style={{ borderColor: lead.color, boxShadow: `0 0 12px ${lead.color}` }}>
      <h2 style={{ color: lead.color }}>{lead.role.split(" ")[0]} Department Overview</h2>
      <p className="dept-description">{lead.description}</p>
      {lead.departmentImage && (
        <div className="dept-image-wrapper">
          <Image src={lead.departmentImage} alt={`${lead.name} Dept`} width={600} height={300} />
        </div>
      )}

      {lead.subDepartments ? (
        Object.entries(lead.subDepartments).map(([subDeptName, subDept]) => (
          subDept && (
            <div key={subDeptName} className="sub-department-section">
              <h3 style={{ borderBottom: `2px solid ${lead.color}` }}>{subDeptName}</h3>
              <p className="subdept-description">{subDept.description}</p>
              <div className="dept-image-wrapper">
                <Image src={subDept.image} alt={subDeptName} width={400} height={200} />
              </div>
              <div className="member-grid">
                {subDept.members.map((m) => (
                  <div key={m.name} className="member-card" style={{ borderColor: lead.color }}>
                    <Image src={m.image} alt={m.name} width={120} height={120} className="profile-img" />
                    <p>{m.name}</p>
                  </div>
                ))}
              </div>
              <button className="apply-btn" style={{ borderColor: lead.color, color: lead.color }}>
                Apply Now
              </button>
            </div>
          )
        ))
      ) : (
        <>
          <div className="member-grid">
            {lead.members?.map((m) => (
              <div key={m.name} className="member-card" style={{ borderColor: lead.color }}>
                <Image src={m.image} alt={m.name} width={120} height={120} className="profile-img" />
                <p>{m.name}</p>
              </div>
            ))}
          </div>
          <button className="apply-btn" style={{ borderColor: lead.color, color: lead.color }}>
            Apply Now
          </button>
        </>
      )}
    </div>
  );
}
