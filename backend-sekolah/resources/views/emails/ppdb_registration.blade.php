<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Pendaftaran PPDB Baru</title>
    <style>
        body {
            font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
            background-color: #f4f6f9;
            color: #333333;
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
        }
        .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #f4f6f9;
            padding: 40px 0;
        }
        .container {
            width: 600px;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        .header {
            background-color: #1e3a8a; /* Indigo/Navy Blue */
            padding: 30px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        .header p {
            margin: 5px 0 0 0;
            font-size: 14px;
            color: #93c5fd;
        }
        .content {
            padding: 30px;
        }
        .content h2 {
            margin-top: 0;
            color: #1e3a8a;
            font-size: 18px;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
        }
        .data-table th, .data-table td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
            font-size: 14px;
        }
        .data-table th {
            background-color: #f8fafc;
            color: #475569;
            font-weight: 600;
            width: 35%;
        }
        .data-table td {
            color: #1e293b;
        }
        .badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
        }
        .badge-sd {
            background-color: #fee2e2;
            color: #dc2626;
        }
        .badge-smp {
            background-color: #dbeafe;
            color: #2563eb;
        }
        .footer {
            background-color: #f8fafc;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
            border-top: 1px solid #e5e7eb;
        }
        .btn {
            display: inline-block;
            background-color: #1e3a8a;
            color: #ffffff !important;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 14px;
            margin-top: 10px;
            margin-bottom: 10px;
        }
        .btn:hover {
            background-color: #1d4ed8;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <h1>Budiman Cendikia</h1>
                <p>Notifikasi Pendaftaran PPDB Baru</p>
            </div>
            <div class="content">
                <h2>Detail Pendaftar Calon Siswa Baru</h2>
                <table class="data-table">
                    <tr>
                        <th>Unit Sekolah</th>
                        <td>
                            @if(strtolower($ppdb->unit) === 'sd')
                                <span class="badge badge-sd">SD (Sekolah Dasar)</span>
                            @else
                                <span class="badge badge-smp">SMP (Sekolah Menengah Pertama)</span>
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <th>Nama Lengkap</th>
                        <td><strong>{{ $ppdb->nama_lengkap }}</strong></td>
                    </tr>
                    <tr>
                        <th>NISN</th>
                        <td>{{ $ppdb->nisn ?: '-' }}</td>
                    </tr>
                    <tr>
                        <th>Tanggal Lahir</th>
                        <td>{{ \Carbon\Carbon::parse($ppdb->tanggal_lahir)->translatedFormat('d F Y') }}</td>
                    </tr>
                    <tr>
                        <th>Jenis Kelamin</th>
                        <td>{{ $ppdb->jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}</td>
                    </tr>
                    <tr>
                        <th>Asal Sekolah</th>
                        <td>{{ $ppdb->asal_sekolah }}</td>
                    </tr>
                    <tr>
                        <th>Nama Orang Tua / Wali</th>
                        <td>{{ $ppdb->nama_ortu }}</td>
                    </tr>
                    <tr>
                        <th>No. HP / WhatsApp</th>
                        <td>{{ $ppdb->no_hp }}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{{ $ppdb->email }}</td>
                    </tr>
                    <tr>
                        <th>Status Awal</th>
                        <td><span style="color: #d97706; font-weight: 600; text-transform: uppercase;">{{ $ppdb->status ?: 'PENDING' }}</span></td>
                    </tr>
                </table>

                <div style="text-align: center;">
                    <a href="{{ url('/admin/ppdb') }}" class="btn" style="margin-right: 10px;">Buka Dashboard PPDB</a>
                    <a href="https://wa.me/6281534648183" style="display: inline-block; background-color: #25d366; color: #ffffff !important; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; margin-top: 10px; margin-bottom: 10px;">Hubungi Kontak Admin</a>
                </div>
            </div>
            <div class="footer">
                <p>Email ini dikirim secara otomatis oleh sistem PPDB Budiman Cendikia.</p>
                <p>&copy; {{ date('Y') }} Budiman Cendikia. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>
