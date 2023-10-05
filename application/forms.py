from django import forms

class RegistrationForm(forms.Form):
    first_name = forms.CharField(label="First Name", max_length=30)
    last_name = forms.CharField(max_length=30)
    email = forms.CharField(max_length=30)
    phone = forms.CharField(max_length=10)
    address = forms.CharField(max_length=30)
    city = forms.CharField(max_length=30)
    postal_code = forms.CharField(max_length=6)
    year = forms.CharField(max_length=4)
    make = forms.CharField(max_length=30)
    model = forms.CharField(max_length=30)
    license_plate = forms.CharField(max_length=8)