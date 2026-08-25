const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const prisma = new PrismaClient();

// Password Hashing Helper
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

async function main() {
  console.log('Seeding demo database...');

  // Ensure screenshots dir exists
  const uploadDir = path.join(__dirname, 'public', 'uploads', 'screenshots');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Define paths of generated images
  const srcCodeImg = "C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\df8a6fc8-1e88-47b5-b0f1-a1a8795b3a10\\mock_code_workspace_1783023637975.png";
  const srcDesignImg = "C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\df8a6fc8-1e88-47b5-b0f1-a1a8795b3a10\\mock_design_workspace_1783023649675.png";

  const destCodeFilename = 'employee-code-sample.jpg';
  const destDesignFilename = 'employee-design-sample.jpg';

  const destCodePath = path.join(uploadDir, destCodeFilename);
  const destDesignPath = path.join(uploadDir, destDesignFilename);

  // Copy images if they exist
  try {
    if (fs.existsSync(srcCodeImg)) {
      fs.copyFileSync(srcCodeImg, destCodePath);
      console.log('Copied code mockup screenshot.');
    }
    if (fs.existsSync(srcDesignImg)) {
      fs.copyFileSync(srcDesignImg, destDesignPath);
      console.log('Copied design mockup screenshot.');
    }
  } catch (e) {
    console.error('Failed to copy screenshots:', e);
  }

  // Clean database
  await prisma.activityLog.deleteMany({});
  await prisma.screenshot.deleteMany({});
  await prisma.user.deleteMany({});

  // 1. Boss Admin
  const adminHashed = hashPassword('password123');
  const admin = await prisma.user.create({
    data: {
      name: 'Boss Admin',
      email: 'admin@company.com',
      password: adminHashed,
      role: 'ADMIN',
      companyId: 'COMPANY-WORKFOLIO'
    }
  });

  // 2. Bilal Khan
  const employeeHashed = hashPassword('password123');
  const employee = await prisma.user.create({
    data: {
      name: 'Bilal Khan',
      email: 'employee@company.com',
      password: employeeHashed,
      role: 'EMPLOYEE',
      companyId: 'COMPANY-WORKFOLIO'
    }
  });

  // 3. User's Admin (rizwan ramzan)
  const krAdminHashed = hashPassword('krtaskersukltd@');
  const krAdmin = await prisma.user.create({
    data: {
      name: 'rizwan ramzan',
      email: 'krtaskersukltd@gmail.com',
      password: krAdminHashed,
      role: 'ADMIN',
      companyId: 'company-AFQL9XZIW'
    }
  });

  // 4. User's Employee (Husnain Tanveer)
  const krEmployeeHashed = hashPassword('password123');
  const krEmployee = await prisma.user.create({
    data: {
      name: 'Husnain Tanveer',
      email: 'husnain.krtasker@gmail.com',
      password: krEmployeeHashed,
      role: 'EMPLOYEE',
      companyId: 'company-AFQL9XZIW'
    }
  });

  console.log('Created Admin and Employee accounts.');

  // Helper to generate activity logs with realistic app details
  function generateActivityLogs(userId) {
    const logs = [];
    const today = new Date();
    for (let hour = 9; hour <= 12; hour++) {
      const endMin = (hour === 12) ? 30 : 59;
      for (let min = 0; min <= endMin; min += 1) {
        const timestamp = new Date(today);
        timestamp.setHours(hour, min, 0, 0);

        // Add a 10 min idle gap around 10:15 - 10:25
        const isIdle = (hour === 10 && min >= 15 && min <= 25);
        
        let appProcess = 'VSCode';
        let appTitle = 'index.html - Workspace';

        if (isIdle) {
          appProcess = 'Idle';
          appTitle = 'No activity';
        } else if (hour === 9) {
          appProcess = 'chrome';
          appTitle = 'workfolio.com/dashboard - Google Chrome';
        } else if (hour === 10) {
          appProcess = 'Antigravity IDE';
          appTitle = 'main.js - Agentic editor';
        } else if (hour === 11) {
          appProcess = 'chrome';
          appTitle = 'pixantra.vercel.app/editor';
        } else if (hour === 12) {
          appProcess = 'explorer';
          appTitle = 'File Explorer';
        }

        logs.push({
          userId: userId,
          status: isIdle ? 'IDLE' : 'ACTIVE',
          currentTask: hour >= 11 ? 'Designing Dashboard UI' : 'Writing Next.js API Routes',
          timestamp,
          appProcess,
          appTitle
        });
      }
    }
    return logs;
  }

  // Create Activity Logs for Today
  const today = new Date();
  const bilalLogs = generateActivityLogs(employee.id);
  const husnainLogs = generateActivityLogs(krEmployee.id);

  await prisma.activityLog.createMany({ data: [...bilalLogs, ...husnainLogs] });
  console.log(`Seeded ${bilalLogs.length + husnainLogs.length} activity tracking logs (minutes).`);

  // Add Screenshots in database
  const timeCode = new Date(today);
  timeCode.setHours(9, 45, 0, 0);

  const timeDesign = new Date(today);
  timeDesign.setHours(11, 20, 0, 0);

  await prisma.screenshot.create({
    data: {
      userId: employee.id,
      filePath: `/uploads/screenshots/${destCodeFilename}`,
      activityRate: 90,
      currentTask: 'Writing Next.js API Routes',
      timestamp: timeCode
    }
  });

  await prisma.screenshot.create({
    data: {
      userId: employee.id,
      filePath: `/uploads/screenshots/${destDesignFilename}`,
      activityRate: 85,
      currentTask: 'Designing Dashboard UI',
      timestamp: timeDesign
    }
  });

  await prisma.screenshot.create({
    data: {
      userId: krEmployee.id,
      filePath: `/uploads/screenshots/${destCodeFilename}`,
      activityRate: 95,
      currentTask: 'Writing Next.js API Routes',
      timestamp: timeCode
    }
  });

  await prisma.screenshot.create({
    data: {
      userId: krEmployee.id,
      filePath: `/uploads/screenshots/${destDesignFilename}`,
      activityRate: 88,
      currentTask: 'Designing Dashboard UI',
      timestamp: timeDesign
    }
  });

  console.log('Seeded screenshot log references.');
  console.log('Seed completed successfully!');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
